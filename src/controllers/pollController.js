import * as pollService from '../services/pollService';
import { badRequest, internalServerError, notFound, noContent, unprocessableEntity } from '../responses';
import { WrongBodyError } from '../error';

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

export async function showStats(reqData, res) {
  const { urlData } = reqData;
  const id = urlData[2];

  try {
    const stats = await pollService.getStatsById(id);
    res.end(JSON.stringify(stats));
  } catch (err) {
    internalServerError(res);
  }
}
