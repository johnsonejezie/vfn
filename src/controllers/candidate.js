import Joi from 'joi';
import boom from 'boom';
import Candidate from '../models/candidate';

const create = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      party: Joi.string().required(),
      photo: Joi.string().required(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      let message = 'Some required fields are missing.';
      if (error.details[0]) {
        message = error.details[0].message
      }
      throw boom.badRequest(message);
    }
    const candidate = new Candidate(value);
    await candidate.save();
    res.status(201).json(candidate);
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

const getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json(candidates);
  } catch (error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err); 
  }
};

const candidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findById(id);
    if (!candidate) {
      throw boom.notFound('Not found');
    }
    res.status(200).json(candidate);
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err); 
  }
}

export default { 
  create,
  getCandidates,
  candidateById
};
