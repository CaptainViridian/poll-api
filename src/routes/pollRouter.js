import { show, create, createVote, showStats } from '../controllers/pollController';
import { ID_REGEX } from '../utils/constants';

export default (router) => {
  router
    .get(`/poll/${ID_REGEX}`, show)
    .post('/poll', create)
    .post(`/poll/${ID_REGEX}/vote`, createVote)
    .get(`/poll/${ID_REGEX}/stats`, showStats);
};
