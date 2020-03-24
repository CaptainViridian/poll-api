import * as pollService from '../services/pollService';
import { badRequest, internalServerError, notFound, noContent, unprocessableEntity } from '../responses';
import { WrongBodyError } from '../error';

/**
*  @api {get} /poll/:id Request Poll information
*  @apiName ShowPoll
*  @apiGroup Poll
*
*  @apiHeader {String} x-access-token User's unique access-token.
*  @apiParam {String} :id Poll's unique ID
*
*  @apiSuccess {String} id Poll's unique ID
*  @apiSuccess {String} description Description of that Poll
*  @apiSuccess {Object[]} options Possible options for vote
*  @apiSuccess {String} options.id Option's unique ID
*  @apiSuccess {String} options.description Description of the Option
*  @apiSuccessExample Response
*    HTTP/1.1 200 OK
*    {
*        "id": "5e799c16dfb8fe3b7f20d7f1",
*        "description": "desc",
*        "options": [
*            {
*                "id": "5e799c16dfb8fe3b7f20d7f2",
*                "description": "1"
*            },
*            {
*                "id": "5e799c16dfb8fe3b7f20d7f3",
*                "description": "2"
*            },
*            {
*                "id": "5e799c16dfb8fe3b7f20d7f4",
*                "description": "3"
*            }
*        ]
*    }
*/
export async function show(reqData, res) {
  const { urlData } = reqData;
  const id = urlData[2];

  try {
    const poll = await pollService.getById(id);

    if(poll)
      res.end(JSON.stringify(poll));
    else
      notFound(res, 'No such poll');
  } catch (err) {
    internalServerError(res);
  }
}


/**
*  @api {post} /poll Create new Poll
*  @apiName CreatePoll
*  @apiGroup Poll
*
*  @apiHeader {String} x-access-token User's unique access-token.
*
*  @apiParam {String} description Description of that Poll
*  @apiParam {String[]} options Descriptions of the possible options for vote
*  @apiSuccessExample Success 201
*     HTTP/1.1 201 Created
*     {
*       "id": "5e770df51fb8e0176f2ca746"
*     }
*/
export async function create(reqData, res) {
  const { body } = reqData;

  try {
    const createdPoll = await pollService.create(body);

    if(createdPoll)
      res.end(JSON.stringify({ pollId: createdPoll._id }));
  } catch (err) {
    if(err instanceof WrongBodyError)
      unprocessableEntity(res);
    else
      internalServerError(res);
  }
}

/**
*  @api {post} /poll/:pollId/vote Add a vote to an option of a Poll
*  @apiName CreateVote
*  @apiGroup Poll
*
*  @apiHeader {String} x-access-token User's unique access-token.
*
*  @apiParam {String} :pollId Poll's unique ID
*  @apiParam {String} optionId Option's unique ID
*
*  @apiSuccessExample Success
*     HTTP/1.1 204 No content
*/
export async function createVote(reqData, res) {
  const { urlData, body } = reqData;
  const pollId = urlData[2];

  try {
    const updatedPoll = await pollService.createVote(pollId, body);
    if(!updatedPoll)
      notFound(res);
    else
      noContent(res);
  } catch (err) {
    if(err instanceof WrongBodyError)
      badRequest(res);
    else
      internalServerError(res);
  }
}

/**
*  @api {get} /poll/:id/stats Request Poll's viewing and voting statistics
*  @apiName ShowPollStats
*  @apiGroup Poll
*
*  @apiHeader {String} x-access-token User's unique access-token.
*
*  @apiParam {String} :id Poll's unique ID
*
*  @apiSuccess {Number} views \# of times the Poll was viewed
*  @apiSuccess {Object[]} votes \# of votes for each option
*  @apiSuccess {String} votes.optionId Option's unique ID
*  @apiSuccess {Number} options.qty \# of votes of the Option
*
*  @apiSuccessExample Response
*     HTTP/1.1 200 OK
*     {
*         "views": 1,
*         "votes": [
*             {
*                 "optionId": "5e799c16dfb8fe3b7f20d7f2",
*                 "qty": 0
*             },
*             {
*                 "optionId": "5e799c16dfb8fe3b7f20d7f3",
*                 "qty": 0
*             },
*             {
*                 "optionId": "5e799c16dfb8fe3b7f20d7f4",
*                 "qty": 0
*             }
*         ]
*     }
*/
export async function showStats(reqData, res) {
  const { urlData } = reqData;
  const id = urlData[2];

  try {
    const stats = await pollService.getStatsById(id);
    if(stats)
      res.end(JSON.stringify(stats));
    else
      notFound(res, 'No such poll');
  } catch (err) {
    internalServerError(res)
    console.log(err);
  }
}
