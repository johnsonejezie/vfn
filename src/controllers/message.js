import Joi from 'joi';
import boom from 'boom';
import async from 'async';
import Message from '../models/message';
import Channel from '../models/channel';
import State from '../models/state';
import LGA from '../models/lga';
import Ward from '../models/ward';
import Pu from '../models/polling_unit';
import Helpers from './helpers';



const create = async (req, res) => {
  try {
    //   console.log('#####');
    const schema = Joi.object().keys({
      message: Joi.string().required(),
      is_scheduled: Joi.boolean().required(),
      scheduled_date: Joi.string(),
    });
    const { value, error } = Joi.validate(req.body, schema);
    if (error && error.details) {
      let message = 'Some required fields are missing.';
      if (error.details[0]) {
        message = error.details[0].message
      }
        throw boom.badRequest(message);
    }

    const message = {
      'message_type': 'ADMM',
      'message': value.message,      
    }
    let channels = [];
    let statesArray = [];
    let calls = [];
    if (req.query.state) {
      const stateString = req.query.state.toLowerCase();
      if (stateString.toLowerCase() === 'all') {
        const states = await State.find();
        console.log('###', states);
        if (states.length > 0) {
          calls.push( async(callback) => {
            states.forEach(async (state, index) => {
                const channel = await Channel.findOne({ name: state.name });
                if (channel) {
                  channels.push(channel.url);
                  statesArray.push(state.name);
                }
                if (index === states.length - 1) {
                    callback();
                }
              });
          })
          
        }
      } else {
        const states = stateString.split(',');
        calls.push(async (callback) => {
            states.forEach(async (state, index) => {
                const channel = await Channel.findOne({ name: state });
                if (channel) {
                  channels.push(channel.url);
                  statesArray.push(state);
                }
                if (index === states.length - 1) {
                    callback();
                }
              });
        })
        
      }
    } else {
      state_is_done = true
    }

    let lgaArray = [];
    if (req.query.lga) {
      const lgaString = req.query.lga.toLowerCase();
      if (lgaString.toLowerCase() === 'all') {
        const lgas = await LGA.find();
        if (lgas.length > 0) {
          calls.push(async(callback) => {
            lgas.forEach(async (lga, index) => {
                const channel = await Channel.findOne({ name: lga.name });
                if (channel) {
                  hannels.push(channel.url);
                  lgaArray.push(lga.name);
                }
                if (index === lgas.length - 1) {
                    callback();
                }
              });
          })
          
        }
      } else {
        const lgas = lgaString.split(',');
        calls.push(async (callback) => {
            lgas.forEach(async (lga, index) => {
                const channel = await Channel.findOne({ name: lga });
                if (channel) {
                  channels.push(channel.url);
                  lgaArray.push(lga);
                }
                if (index === lgas.length - 1) {
                    callback();
                }
              });
        });
        
      }
    }

    let wardArray = [];
    if (req.query.ward) {
      const wardString = req.query.ward.toLowerCase();
      if (wardString.toLowerCase() === 'all') {
        const wards = await Ward.find();
        if (wards.length > 0) {
          calls.push(async (callback) => {
            wards.forEach(async (ward, index) => {
              const channel = await Channel.findOne({ name: ward.name });
              if (channel) {
                channels.push(channel.url);
                wardArray.push(ward.name);
              }
              if (index === wards.length - 1) {
                callback();
              }
            });
          });
        }
      } else {
        const wards = wardString.split(',');
        calls.push(async (callback) => {
          wards.forEach(async (ward, index) => {
            const channel = await Channel.findOne({ name: ward });
            if (channel) {
              channels.push(channel.url);
              wardArray.push(ward);
            }
            if (index === wards.length - 1) {
              callback();
            }
          });
        })
      }
    }

    let puArray = [];
    if (req.query.polling_unit) {
      const puString = req.query.polling_unit.toLowerCase();
      if (puString.toLowerCase() === 'all') {
        const pus = await Pu.find();
        if (pus.length > 0) {
          calls.push(async(callback) => {
            pus.forEach(async (pu, index) => {
              const channel = await Channel.findOne({ name: pu.name });
              if (channel) {
                channels.push(channel.url);
                puArray.push(pu.name);
              }
              if (index === pus.length - 1) {
                callback();
              }
            });
          });
        }
      } else {
        const pus = puString.split(',');
        calls.push(async (callback) => {
          pus.forEach(async (pu, index) => {
            const channel = await Channel.findOne({ name: pu });
            if (channel) {
              channels.push(channel.url);
              puArray.push(pu);
            }
            if (index === pus.length - 1) {
              callback();
            }
          });
        });
      }
    }

    async.parallel(calls, async (error, result) => {
      if (value.is_scheduled) {
        const date = new Date(value.schedule_date);
        value.schedule_date = date;
      } else {
        channels.forEach((channel) => {
          Helpers.sendMessage(message, channel);
        });
      }
        
      const aMessage = new Message({
        message: value.message,
        channels: channels,
        states: statesArray,
        lgas: lgaArray,
        wards: wardArray,
        polling_units: puArray,
        is_scheduled: value.is_scheduled,
        schedule_date: value.schedule_date,
        sent_by: req.admin._id,
      });
      await aMessage.save();
      res.status(200).json(aMessage);
    });
  } catch(error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err); 
  }
}

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate('sent_by').exec();
    res.status(200).json(messages);
  } catch (error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

export default {
  getMessages,
  create,
};