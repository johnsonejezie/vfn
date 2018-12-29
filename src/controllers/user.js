import Joi from 'joi';
import boom from 'boom';
import fetch from 'node-fetch';
import _ from 'lodash';
import { URLSearchParams } from 'url';
import User from '../models/user';
import Helpers from './helpers';

const join = async (req, res) => {
  try {
    const schema = Joi.object().keys({
      state_id: Joi.string().required(),
      last_name: Joi.string().required(),
      vin: Joi.string().required(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      let message = 'Some required fields are missing.';
      if (error.details[0]) {
        message = error.details[0].message
      }
      throw boom.badRequest(message);
    }
    let { state_id, last_name, vin } = value;
    const existingUser = await User.findOne({ vin });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    const params = new URLSearchParams();
    params.append('state_id', state_id);
    params.append('last_name', last_name.toLowerCase());
    params.append('vin', vin);
   
    const url = "http://voters.inecnigeria.org/Api/checkVoter";
    const response = await fetch(url, { method: 'post',
        body:    params,
        headers: { 'Authorization': process.env.PVC_VERIFICATION_KEY }, });
    const json = await response.json();

    let voter_info = {}
    if (json.voterInfo) {
      for (const key of Object.keys(json.voterInfo)) {
        voter_info[key] = _.mapValues(json.voterInfo[key], function(s, i) {
          if (i === 'vin') {
            return s;
          }
          return _.isString(s) ? s.toLowerCase() : s;
        });
      }
      const user = new User({
        first_name: voter_info.Voter.first_name,
        last_name: voter_info.Voter.last_name,
        vin_full: voter_info.Voter.vin,
        gender: voter_info.Voter.gender,
        profession: voter_info.Voter.occupation,
        vin: value.vin,
        state_id: value.state_id,
        state_name: voter_info.State.name,
        lga_name: voter_info.Pu.lga,
        ward: voter_info.Pu.ward,
        polling_unit: voter_info.Pu.pu
      });
      await user.save();
      await Helpers.pollingUnit(voter_info.Pu);
      res.status(201).json(user);
    } else {
      throw boom.badRequest('Verification of PVC failed.');
    }
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOneAndUpdate({ '_id': id }, { $set: req.body }, { new: true });
    if (!user) {
      throw boom.notFound('User not found');
    }
    res.status(200).json(user);
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

const userById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw boom.notFound('Not found');
    }
    res.status(200).json(user);
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err); 
  }
};

export default {
  join,
  update,
  userById
}