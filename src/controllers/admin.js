import Joi from 'joi';
import boom from 'boom';
import _ from 'lodash';
import Admin from '../models/admin';

const create = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      password: Joi.string().required(),
      username: Joi.string().required(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      let message = 'Some required fields are missing.';
      if (error.details[0]) {
        message = error.details[0].message
      }
      throw boom.badRequest(message);
    }
    const existingAdmin = await Admin.findOne({ username: value.username });
    if (existingAdmin) {
        throw boom.badRequest('Username already exists');
    }
    const admin = new Admin(value);
    await admin.save();
    const token = await admin.generateAuthToken();
    res.status(201).json({ token });
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

const login = async (req, res) => {
  try {
    const schema = Joi.object().keys({
        password: Joi.string().required(),
        username: Joi.string().required(),
      });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      let message = 'Some required fields are missing.';
      if (error.details[0]) {
        message = error.details[0].message
      }
      throw boom.badRequest(message);
    }
    
    const admin = await Admin.findByCredentials(value.username, value.password);
    const token = await admin.generateAuthToken();
  
    res.status(200).json({ token });
  } catch (error) {
      boom.boomify(error);
      const err = new Error();
      err.status = error.status || error.output.statusCode || 500;
      err.message = error.message || 'Internal server error';
      res.status(err.status).send(err);
    }
};

const adminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      throw boom.notFound('Not found');
    }
    res.status(200).json(admin);
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err); 
  }
};

const adminByToken = async (req, res) => {
  res.status(200).json(req.admin);
};

const ensureAuthenticated = async (req, res, next) => {
    try {
      if (!req.header('Authorization')) {
        throw boom.unauthorized('Please login');
      }
      const token = req.header('Authorization').split(' ')[1];
      const admin = await Admin.findByToken(token);
      if (!admin) {
        throw boom.notFound('Admin not found');
      }
      req.admin = admin;
      req.token = token;
      return next();
    } catch (error) {
      boom.boomify(error);
      const err = new Error();
      err.status = error.status || error.output.statusCode || 500;
      err.message = error.message || 'Internal server error';
      res.status(err.status).json(err); 
    }
  };

export default {
  create,
  adminById,
  adminByToken,
  ensureAuthenticated,
  login,
};