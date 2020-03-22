import Poll from '../models/Poll';

export async function getById(id) {
  try {
    const poll = await Poll.findByIdAndUpdate(id, { $inc: { views: 1 } }).select('-options.votes -views');
    return poll;
  } catch (err) {
    throw err;
  }
}

export async function create(body) {
  let { description, options } = body;
  options = options.map(option => ({ description: option, votes: 0 }));

  try {
    const poll = await Poll.create({ description, options, views: 0 });
    return poll;
  } catch (err) {
    throw err;
  }
}

export async function createVote(pollId, body) {
  const { optionId } = body;

  try {
    const poll = await Poll.findOneAndUpdate(
      { _id: pollId, 'options._id': optionId },
      { $inc: { "options.$.votes": 1 } },
    );
    return poll;
  } catch (err) {
    throw err;
  }
}

export async function getStatsById(id) {
  try {
    const poll = await Poll.findById(id, 'views options');

    const { views, options } = poll;

    const votes = options.map( ({ _id, votes }) => (
      { optionId: _id, qty: votes }
    ));

    return { views, votes };
  } catch (err) {
    throw err;
  }
}
