import User from './user';
import Channel from './channel';
import Candidate from './candidate';
import Admin from './admin';
import Message from './message';

export default (app) => {
  User(app);
  Channel(app);
  Candidate(app);
  Message(app);
  Admin(app);
  app.get('/healthcheck', (req, res) => {
    res.json({ message: 'Working' });
  });
};