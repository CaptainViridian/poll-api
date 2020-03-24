import mongoose from 'mongoose';
import Poll from '../models/Poll';
import { WrongBodyError } from '../error';

const { Error: { ValidationError, CastError } } = mongoose;

export async function getById(id) {
  const poll = await Poll.findByIdAndUpdate(id, { $inc: { views: 1 } }).select('-options.votes -views');
  return poll;
}

export async function create(body) {
  let { description, options: optionsDescriptions } = body;

  try {
    const options = optionsDescriptions.map(description => ({ description }));

    const poll = await Poll.create({ description, options });
    return poll;
  } catch (err) {
    if(err instanceof ValidationError || err instanceof TypeError)
      throw new WrongBodyError();
    else throw err;
  }
}

export async function createVote(pollId, body) {
  const { optionId } = body;
  if(!optionId)
    throw new WrongBodyError();

  try {
    const poll = await Poll.findOneAndUpdate(
      { _id: pollId, 'options._id': optionId },
      { $inc: { 'options.$.votes': 1 } },
    );
    return poll;
  } catch (err) {
    if(err instanceof CastError)
      return;
    else throw err;
  }
}

export async function getStatsById(id) {
  const poll = await Poll.findById(id, 'views options');

  if(!poll)
    return;

  const { views, options } = poll;

  const votes = options.map( ({ _id, votes }) => (
    { optionId: _id, qty: votes }
  ));

  return { views, votes };
}
