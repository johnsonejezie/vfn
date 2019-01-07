import Message from '../controllers/message';
import Admin from '../controllers/admin';

export default (app) => {

 /**
 * @api {get} /message Get all message
 * @apiGroup Message
 *  @apiHeader {String} Authorization Token of authenticated admin
  * @apiHeaderExample {json} Header
  *  {
  *    "Authorization": "Bearer rjefbnjnejgni3o9i609490piwjnjtrn...",
  *  }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  [
 *  {
 *       "channels": [
            "sendbird_open_channel_46212_3d8853f5f49293ad8aa70aa48780468cd23d459d",
            "sendbird_open_channel_46212_4d0d9dc9a4dd970a9840f7fd5bebde63e02eae14",
            "sendbird_open_channel_46212_d665f55fcf4ea57a1a56da77ae4948f0e1086d39",
            "sendbird_open_channel_46212_507f87feee36c4cd28b1ab5e1ed9aa8676b7c85e"
        ],
        "states": [
            "rivers"
        ],
        "lgas": [
            "obio/akpor"
        ],
        "wards": [
            "rumueme (7a)",
        ],
        "polling_units": [
            "oro-ekpo, rumuepiri kom i",
        ],
        "is_scheduled": false,
        "scheduled_date": null,
        "_id": "5c3336743489577ea9cb36de",
        "message": "Testing message sending to all",
        "sent_by": "5c32ec7fc3f4646882d13027",
        "createdAt": "2019-01-07T11:22:28.522Z",
        "updatedAt": "2019-01-07T11:22:28.522Z",
        "__v": 0
    }
 * ]
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 404,
 *   "message": "Admin not found"
 *  }
 */
  app.get('/api/v1/message', Admin.ensureAuthenticated, Message.getMessages);


  /**
 * @api {post} /message Send Message
 * @apiGroup Message
 * @apiParam (Query string) {String} state comma separated list of state chatrooms to send message to. e.g ?state=kano,lagos, to send to all state, user ?state=all 
 * @apiParam (Query string) {String} lga comma separated list of lga chatrooms to send message to. e.g ?lga=yaba,okigwe, to send to all lga, user ?lga=all
 * @apiParam (Query string) {String} ward comma separated list of ward chatrooms to send message to. e.g ?ward=ward1,ward2, to send to all ward, user ?ward=all
 * @apiParam (Query string) {String} polling_unit comma separated list of polling units chatrooms to send message to. e.g ?polling_unit=pu1,pu2, to send to all Polling Unit, user ?polling_unit=all 
 * @apiParam {String} message 
 * @apiParam {Boolean} is_scheduled 
 * @apiParam {String} schedule_date Date to schedule message in ISO format 2018-12-18T15:05:32.000Z

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *   "success": true,
 * }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 400,
 *   "message": "Invalid password/username"
 *  }
 */
  app.post('/api/v1/message', Admin.ensureAuthenticated, Message.create);
};