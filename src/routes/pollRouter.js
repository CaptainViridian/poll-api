import { badRequest, internalServerError, notFound } from '../responses';

export default (router) => {
  router
  .get('/poll/[0-9]+', async (reqData, res) => {
    res.end();
  })
  .post('/poll', async (reqData, res) => {
    res.end();
  })
  .post('/poll/[0-9]+/vote', async (reqData, res) => {
    res.end();
  })
  .get('/poll/[0-9]+/stats', async (reqData, res) => {
    res.end();
  });
};
