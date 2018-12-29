import User from './user';
import Channel from './channel';
import Candidate from './candidate';

export default (app) => {
  User(app);
  Channel(app);
  Candidate(app);
  app.get('/healthcheck', (req, res) => {
    res.json({ message: 'Working' });
  });
};