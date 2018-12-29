import Candidate from '../controllers/candidate';

export default (app) => {

/**
 * @api {get} /candidates Get All Candidates
 * @apiGroup Candidate
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 * [
 *  {
        "_id": "5c27630027673a7774b70dfc",
        "name": "Atiku Abubakar",
        "party": "PDP",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082802/atiku.jpg",
        "__v": 0
    },
    {
        "_id": "5c27638b756fcf77923617ea",
        "name": "Muhammadu Buhari",
        "party": "APC",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082801/buhari.jpg",
        "__v": 0
    },
    {
        "_id": "5c2763ea756fcf77923617eb",
        "name": "Obiageli Ezekwesili",
        "party": "ACPN",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082802/oby.jpg",
        "__v": 0
    },
    {
        "_id": "5c276427756fcf77923617ec",
        "name": "Donald Duke",
        "party": "SDP",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082803/donald.jpg",
        "__v": 0
    },
    {
        "_id": "5c276473756fcf77923617ed",
        "name": "Kingsley Moghalu",
        "party": "YPP",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082802/kingsley.jpg",
        "__v": 0
    },
    {
        "_id": "5c2764bf756fcf77923617ee",
        "name": "Fela Durotoye",
        "party": "ANN",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082803/fela.png",
        "__v": 0
    },
    {
        "_id": "5c276508756fcf77923617ef",
        "name": "Omoyele Sowore",
        "party": "AAC",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082802/sowore.jpg",
        "__v": 0
    }
 * ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.get('/api/v1/candidates', Candidate.getCandidates);

  /**
 * @api {get} /candidate/:id Get candidate by id
 * @apiGroup Candidate
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *  {
        "_id": "5c27630027673a7774b70dfc",
        "name": "Atiku Abubakar",
        "party": "PDP",
        "photo": "https://res.cloudinary.com/hlsnej6pa/image/upload/v1546082802/atiku.jpg",
        "__v": 0
    }
 * 
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Bad Request
 * {
 *   "status": 500,
 *   "message": "Internal server error"
 *  }
 */
  app.get('/api/v1/candidate/:id', Candidate.candidateById);

  app.post('/api/v1/candidate', Candidate.create);
};