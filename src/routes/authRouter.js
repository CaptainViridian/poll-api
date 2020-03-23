import { authenticate } from '../controllers/authController';

export default (router) => {
  router
    .post('/authenticate', authenticate);
};
