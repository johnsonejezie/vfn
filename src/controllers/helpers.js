import sendbird from 'sendbird';
import fetch from 'node-fetch';
import State from '../models/state';
import LGA from '../models/lga';
import Ward from '../models/ward';
import PollingUnit from '../models/polling_unit';
import Channel from '../models/channel';


const getLGA = async (pu) => {
  try {
    const existingLGA = await LGA.findOne({ name: pu.lga });
    if (existingLGA) {
      return existingLGA;
    }
    const state = await State.findOne({ name: pu.state });
    if (!state) {
      return null;
    }
    const newLGA = new LGA({
      name: pu.lga,
      state: state._id,
    });
    const channel = {
      name: pu.lga,
      data: `${pu.lga} vote for Nigeria`,
      operator_ids: [],
      custom_type: ''  
    };
    createChannel(channel, 'lga');

    const stateChannel = await Channel.findOne({ name: pu.state });
    if (!stateChannel) {
      const sChannel = {
        name: pu.state,
        data: `${pu.state} vote for Nigeria`,
        operator_ids: [],
        custom_type: ''  
     };
     createChannel(sChannel, 'state');
    }
    await newLGA.save()
    return newLGA
  } catch(error) {
    return null;
  }
};

const getWard = async (pu) => {
  try {
    const existingWard = await Ward.findOne({ name: pu.ward });
    if (existingWard) {
      return existingWard;
    }
    const lga = await getLGA(pu);
    if (!lga) {
      return null;
    }
    const ward = new Ward({
      name: pu.ward,
      lga: lga._id,
    });
    const channel = {
      name: pu.ward,
      data: `${pu.ward} vote for Nigeria`,
      operator_ids: [],
      custom_type: ''  
    };
    createChannel(channel, 'ward');
    await ward.save();
    return ward;
  } catch(error) {
    return null;
  }
};

const pollingUnit = async (pu) => {
  try {
    const existingPollingUnit = await PollingUnit.findOne({ name: pu.pu });
    if (existingPollingUnit) {
      return;
    }
    const ward = await getWard(pu);
    const pUnit = new PollingUnit({
      name: pu.pu,
      ward: ward._id,
    });
    const channel = {
      name: pu.pu,
      data: `${pu.pu} vote for Nigeria`,
      operator_ids: [],
      custom_type: ''  
    };
    createChannel(channel, 'pu');
    await pUnit.save();
    return pUnit;
  } catch(error) {
    return null;
  }
};

const createChannel = async (body, type, ) => {
  fetch('https://api.sendbird.com/v3/open_channels', { method: 'POST',
    body: JSON.stringify(body), 
    headers: { 'Content-Type': 'application/json', 'Api-Token': process.env.SENDBIRD_TOKEN },
  })
    .then(res => res.json()) // expecting a json response
    .then(json => {
      const channel = new Channel({
        name: json.name,
        url: json.channel_url,
        description: body.data,
        level: type
      });
      channel.save();
    });
};

export default {
  pollingUnit,
};
