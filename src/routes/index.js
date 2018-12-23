import User from './user';
import Channel from './channel';

export default (app) => {
  User(app);
  Channel(app);
  app.get('/healthcheck', (req, res) => {
    res.json({ message: 'Working' });
  });
};