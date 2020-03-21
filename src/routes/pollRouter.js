import { badRequest, internalServerError, notFound } from '../responses';
import { show, create } from '../controllers/pollController'
import { ID_REGEX } from '../utils/constants';

export default (router) => {
  router
  .get(`/poll/${ID_REGEX}`, show)
  .post('/poll', create)
  .post(`/poll/${ID_REGEX}/vote`, async (reqData, res) => {
    res.end();
  })
  .get(`/poll/${ID_REGEX}/stats`, async (reqData, res) => {
    res.end();
  });
};
