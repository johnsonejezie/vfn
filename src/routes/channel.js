import Channel from '../controllers/channel';

export default (app) => {

/**
 * @api {get} /user/:id/channel Get users channel
 * @apiGroup Channel
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
 *  {
 *       "level": "lga",
 *       "_id": "5c1f8db8aff4580adcf68cdc",
 *       "name": "obio/akpor",
 *       "url": "sendbird_open_channel_46212_507f87feee36c4cd28b1ab5e1ed9aa8676b7c85e",
 *       "description": "obio/akpor vote for Nigeria",
 *       "__v": 0
 *   },
 *   {
 *       "level": "pu",
 *       "_id": "5c1f8db8aff4580adcf68cdb",
 *       "name": "oro-ekpo, rumuepiri kom i",
 *       "url": "sendbird_open_channel_46212_4d0d9dc9a4dd970a9840f7fd5bebde63e02eae14",
 *       "description": "oro-ekpo, rumuepiri kom i vote for Nigeria",
 *       "__v": 0
 *   },
 *   {
 *       "level": "state",
 *       "_id": "5c1f8db8aff4580adcf68cd9",
 *       "name": "rivers",
 *       "url": "sendbird_open_channel_46212_b57c3dc0371b4b1ee3f480cce3ca1f181ea49eae",
 *       "description": "rivers vote for Nigeria",
 *       "__v": 0
 *   },
 *   {
 *       "level": "ward",
 *       "_id": "5c1f8db8aff4580adcf68cda",
 *       "name": "rumueme (7a)",
 *       "url": "sendbird_open_channel_46212_3d8853f5f49293ad8aa70aa48780468cd23d459d",
 *       "description": "rumueme (7a) vote for Nigeria",
 *       "__v": 0
 *   }
 * ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.get('/api/v1/user/:id/channel', Channel.getUserChannels);
};