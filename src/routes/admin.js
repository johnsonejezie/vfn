import Admin from '../controllers/admin';

export default (app) => {

 /**
 * @api {get} /admin/me Get admin by token
 * @apiGroup Admin
 *  @apiHeader {String} Authorization Token of authenticated admin
  * @apiHeaderExample {json} Header
  *  {
  *    "Authorization": "Bearer rjefbnjnejgni3o9i609490piwjnjtrn...",
  *  }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *       "_id": "5c27630027673a7774b70dfc",
 *       "username": "larry22",
 *   }
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 404,
 *   "message": "Admin not found"
 *  }
 */
  app.get('/api/v1/admin/me', Admin.ensureAuthenticated, Admin.adminByToken);

  /**
 * @api {get} /admin/:id Get admin by id
 * @apiGroup Admin
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
 *       "_id": "5c27630027673a7774b70dfc",
 *       "username": "larry22",
 *   }
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.get('/api/v1/admin/:id', Admin.adminById);

  app.post('/api/v1/admin', Admin.create);

  /**
 * @api {post} /login Admin Login
 * @apiGroup Admin
 * @apiParam {String} username 
 * @apiParam {String} password 
 * @apiParamExample {json} Input
 * {
 *	"username": "Igwe",
 *	"password": "theman",
 * }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * {
 *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzMyZWM3ZmMzZjQ2NDY4ODJkMTMwMjciLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ2ODQxMzA5fQ.fp1-qYHftclW9GUhO32tS2Xp2e7La78nFlDr-drSfCI",
 * }
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 400,
 *   "message": "Invalid password/username"
 *  }
 */
  app.post('/api/v1/login', Admin.login);
};