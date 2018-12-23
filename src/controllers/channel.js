import boom from 'boom';
import Channel from '../models/channel';
import User from '../models/user';

const getUserChannels = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    const channels = await Channel.find({ $or: [{name: user.polling_unit},{name: user.lga_name}, {name: user.state_name}, {name: user.ward} ] });
    res.status(200).json(channels);
  } catch (error) {
    boom.boomify(error);
    const err = new Error();
    err.status = error.status || error.output.statusCode || 500;
    err.message = error.message || 'Internal server error';
    res.status(err.status).send(err);
  }
};

export default {
    getUserChannels,
};