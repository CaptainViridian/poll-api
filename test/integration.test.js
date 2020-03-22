import chai from 'chai';
import chaiHttp from 'chai-http';

import mock from './mock'
import seed from './seeder';
import app from '../src/server';
import * as db from '../src/db';

import { ID_REGEX } from '../src/utils/constants';

chai.use(chaiHttp);

const should = chai.should();

const resetDB = async () => {
  await seed();
  await db.connect();
};

describe('Routes', () => {
  beforeEach(resetDB);

  describe('GET /poll/:id', () => {
    const url = id => `/poll/${id}`;

    it('should return a poll\'s data', async () => {
      const { poll, poll: {  _id: id } } = mock();

      const res = await chai
      .request(app)
      .get(url(id));

      res.should.have.status(200);
      res.body.should.deep.equal(poll);
    });

    it('should return not found when poll id does not exist', async () => {
      const { randomId } = mock();

      const res = await chai
      .request(app)
      .get(url(randomId));

      res.should.have.status(404);
    });

    it('should return not found when poll id is invalid', async () => {
      const invalidId = '123';

      const res = await chai
      .request(app)
      .get(url(invalidId));

      res.should.have.status(404);
    });
  });

  describe('POST /poll/', () => {
    it('should return only the created poll\'s id', async () => {
      const { newPoll } = mock();

      const res = await chai
      .request(app)
      .post('/poll')
      .send(newPoll);

      res.should.have.status(201);
      res.body.should.have.property('pollId').that.matches(new RegExp(`^${ID_REGEX}$`));
      res.body.should.have.all.keys('pollId');
    });

    it('should return unprocessable entity when a parameter is missing', async () => {
      const { newPoll } = mock();
      newPoll.options = undefined;

      const res = await chai
      .request(app)
      .post('/poll')
      .send(newPoll);

      res.should.have.status(422);

      const { newPoll: oneMorePoll } = mock();
      oneMorePoll.description = undefined;

      const oneMoreRes = await chai
      .request(app)
      .post('/poll')
      .send(oneMorePoll);

      oneMoreRes.should.have.status(422);
    });

    it('should return unprocessable entity when options is empty', async () => {
      const { newPoll } = mock();
      newPoll.options = [];

      const res = await chai
      .request(app)
      .post('/poll')
      .send(newPoll);

      res.should.have.status(422);
    });
  });

  describe('POST /poll/:id/vote', () => {
    const url = pollId => `/poll/${pollId}/vote`;

    it('should return no content when vote is done', async () => {
      const {
        poll: {
          _id: pollId,
          options
        },
      } = mock();

      const { _id: optionId } = options[0];

      const res = await chai
      .request(app)
      .post(url(pollId))
      .send({ optionId });

      res.should.have.status(204);
      res.body.should.be.empty;
    });

    it('should return bad request when parameter is missing', async () => {
      const {
        poll: {
          _id: pollId,
        },
      } = mock();

      const res = await chai
      .request(app)
      .post(url(pollId))
      .send();

      res.should.have.status(400);
    });

    it('should return not found when optionId is not part of selected poll', async () => {
      const {
        poll: { _id: pollId },
        otherPoll: { options },
      } = mock();
      const { _id: optionId } = options[0];

      const res = await chai
      .request(app)
      .post(url(pollId))
      .send({ optionId });

      res.should.have.status(404);
    });

    it('should return not found when option id is invalid', async () => {
      const { poll: { _id: pollId } } = mock();
      const invalidOptionId = '123';

      const res = await chai
      .request(app)
      .post(url(pollId))
      .send({ optionId: invalidOptionId });

      res.should.have.status(404);
    });
  });

  describe('GET /poll/:id/stats', () => {
    it('should return the poll\'s stats', async () => {
      const { poll: { _id: pollId }, pollStats } = mock();

      const res = await chai
      .request(app)
      .get(`/poll/${pollId}/stats`);

      res.should.have.status(200);
      res.body.should.deep.equal(pollStats);
    });
  });
});
