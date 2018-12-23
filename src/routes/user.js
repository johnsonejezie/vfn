import User from '../controllers/user';

export default (app) => {

/**
 * @api {post} /join Join/Register/Login
 * @apiGroup User
 * @apiParam {String} last_name Last name of pvc owner
 * @apiParam {String} vin Voter Identification Number
 * @apiParam {String} state_id ID of pvc owner state
 * @apiParamExample {json} Input
 * {
 *	"last_name": "Igwe",
 *	"state_id": "33",
 *	"vin": "700767"
 * }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *   "_id": "5c1f668cd488b0ff1a0a6a4b",
 *   "first_name": "joseph",
 *   "last_name": "igwe",
 *   "vin_full": "030DEF45CF408700767",
 *   "gender": "male",
 *   "profession": "artisan",
 *   "vin": "700767",
 *   "state_name": "rivers",
 *   "lga_name": "obio/akpor",
 *   "ward": "rumueme (7a)",
 *   "polling_unit": "oro-ekpo, rumuepiri kom i",
 *   "__v": 0
 * }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.post('/api/v1/join', User.join);

  /**
 * @api {patch} /user/:id Update user
 * @apiGroup User
 * @apiParam {Object} Object of user fields
 * @apiParamExample {json} Input
 * {
 *   "first_name": "joseph",
 *   "last_name": "igwe",
 *   "vin_full": "030DEF45CF408700767",
 *   "gender": "male",
 *   "profession": "artisan",
 *   "vin": "700767",
 *   "state_name": "rivers",
 *   "lga_name": "obio/akpor",
 *   "ward": "rumueme (7a)",
 *   "polling_unit": "oro-ekpo, rumuepiri kom i",
 * }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *   "_id": "5c1f668cd488b0ff1a0a6a4b",
 *   "first_name": "joseph",
 *   "last_name": "igwe",
 *   "vin_full": "030DEF45CF408700767",
 *   "gender": "male",
 *   "profession": "artisan",
 *   "vin": "700767",
 *   "state_name": "rivers",
 *   "lga_name": "obio/akpor",
 *   "ward": "rumueme (7a)",
 *   "polling_unit": "oro-ekpo, rumuepiri kom i",
 *   "__v": 0
 * }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.patch('/api/v1/user/:id', User.update);
};