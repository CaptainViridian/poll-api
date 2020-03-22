import { pollService } from '../services';
import { badRequest, internalServerError, notFound } from '../responses';

export async function show(reqData, res) {
  const { urlData } = reqData;
  const id = urlData[2];

  try {
    const poll = await pollService.getById(id);

    if(poll)
      res.end(JSON.stringify(poll));
    else
      notFound(res);
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
    internalServerError(res);
  }
}

export async function createVote(reqData, res) {

}

export async function showStats(reqData, res) {

}
