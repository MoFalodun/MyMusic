/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userInfo, userLogin, fakeLoginObj, invalidSignUpObj } from '../fixtures/user';
import { artistInfo, artistLogin } from '../fixtures/artist';
import { albumInfo } from '../fixtures/album';
import { songInfo } from '../fixtures/song';
import { constants } from '../../app/utils';

const { expect } = chai;
chai.use(chaiHttp);
let artistToken;
let userToken;
const path = 'test/integration/test.png';
const picturePath = 'test/integration/test.png';
const musicPath = 'test/integration/test.mp3';
const {
  USER_ALREADY_EXIST,
  INVALID_PERMISSION
} = constants;

describe('User Activities', () => {
  describe('Auth Routes', () => {
    it('should properly sign-up a user', (done) => {
      chai.request(app).post('/user/sign-up').send(userInfo)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.a('string').equals('Account created successfully');
          done();
        });
    });
    it('should login a registered user', (done) => {
      chai.request(app).post('/user/login').send(userLogin)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data.token).to.be.a('string').of.length.greaterThan(40);
          expect(res.body.data.user.role).to.be.equals('user');
          userToken = res.body.data.token;
          done();
        });
    });
    it('should properly sign-up an artist', (done) => {
      chai.request(app).post('/artist/sign-up').send(artistInfo)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('success');
          expect(res.body.message).to.be.a('string').equals('Account created successfully');
          done();
        });
    });
    it('should login a registered artist', (done) => {
      chai.request(app).post('/artist/login').send(artistLogin)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('success');
          expect(res.body.data.token).to.be.a('string').of.length.greaterThan(40);
          expect(res.body.data.user.role).to.be.equals('artist');
          artistToken = res.body.data.token;
          done();
        });
    });
    it('login should fail', (done) => {
      chai.request(app).post('/user/login').send(fakeLoginObj)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          done();
        });
    });
    it('sign-up validation should fail', (done) => {
      chai.request(app).post('/user/sign-up').send(invalidSignUpObj)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('fail');
          done();
        });
    });
    it('should throw an error when trying to signup with an existing email', (done) => {
      chai.request(app).post('/artist/sign-up').send(artistInfo)
        .end((err, res) => {
          expect(res.body.status).to.be.equal('fail');
          expect(res.body.message).to.be.a('string').equals(USER_ALREADY_EXIST);
          done();
        });
    });
    it('login should fail', (done) => {
      chai.request(app).post('/artist/login').send(fakeLoginObj)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('Incorrect login details');
          done();
        });
    });
  });
  describe('Album Route', () => {
    it('should allow an artist add an album successfully', (done) => {
      chai.request(app).post('/album/').set({ Authorization: `Bearer ${artistToken}` })
        .field('albumName', albumInfo.albumName)
        .field('description', albumInfo.description)
        .field('genre', albumInfo.genre)
        .attach('pictures', path)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Album created successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw an error when  an user tries to add an album', (done) => {
      chai.request(app).post('/album/').set({ Authorization: `Bearer ${userToken}` })
        .field('albumName', albumInfo.albumName)
        .field('description', albumInfo.description)
        .field('genre', albumInfo.genre)
        .attach('pictures', path)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(INVALID_PERMISSION);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });
  describe('Song Route', () => {
    it('should allow an artist add a song successfully', (done) => {
      chai.request(app).post('/song/').set({ Authorization: `Bearer ${artistToken}` })
        .field('name', songInfo.name)
        .field('lyrics', songInfo.lyrics)
        .field('genre', songInfo.genre)
        .attach('pictures', picturePath)
        .attach('music', musicPath)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Song created successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw an error when an user tries to add a song', (done) => {
      chai.request(app).post('/song/').set({ Authorization: `Bearer ${userToken}` })
        .field('name', songInfo.name)
        .field('lyrics', songInfo.lyrics)
        .field('genre', songInfo.genre)
        .attach('music', musicPath)
        .attach('pictures', picturePath)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(INVALID_PERMISSION);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('should throw an error when the album Id does not exist', (done) => {
      chai.request(app).post('/song/').set({ Authorization: `Bearer ${artistToken}` })
        .field('name', songInfo.name)
        .field('lyrics', songInfo.lyrics)
        .field('genre', songInfo.genre)
        .field('albumId', '6e34bb7a-a337-43ee-aa67-8d4ecbb1a5ed')
        .attach('music', musicPath)
        .attach('pictures', picturePath)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('Album does not exist');
          expect(res.statusCode).to.equal(409);
          done();
        });
    });
  });
});
