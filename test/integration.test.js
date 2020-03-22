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
    it('should return a poll\'s data', async () => {
      const { poll, poll: {  _id: id } } = mock;

      const res = await chai
      .request(app)
      .get(`/poll/${id}`);

      res.should.have.status(200);
      res.body.should.deep.equal(poll);
    });
  });

  describe('POST /poll/', () => {
    it('should return only the created poll\'s id', async () => {
      const { newPoll } = mock;

      const res = await chai
      .request(app)
      .post('/poll')
      .send(newPoll);

      res.should.have.status(201);
      res.body.should.have.property('pollId').that.matches(new RegExp(`^${ID_REGEX}$`));
      res.body.should.have.all.keys('pollId');
    });
  });

  describe('POST /poll/:id/vote', () => {
    it('should return no content', async () => {
      const {
        poll: {
          _id: pollId,
          options
        },
      } = mock;

      const { _id: optionId } = options[0];

      const res = await chai
      .request(app)
      .post(`/poll/${pollId}/vote`)
      .send({ optionId });

      res.should.have.status(204);
      res.body.should.be.empty;
    });
  });

  describe('GET /poll/:id/stats', () => {
    it('should return the poll\'s stats', async () => {
      const { poll: { _id: pollId }, pollStats } = mock;

      const res = await chai
      .request(app)
      .get(`/poll/${pollId}/stats`);

      res.should.have.status(200);
      res.body.should.deep.equal(pollStats);
    });
  });
});
