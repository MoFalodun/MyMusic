/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { userInfo, userLogin, fakeLoginObj, invalidSignUpObj, playlistName, duplicatePlaylistName } from '../fixtures/user';
import { artistInfo, artistLogin } from '../fixtures/artist';
import { albumInfo } from '../fixtures/album';
import { songInfo } from '../fixtures/song';
import { constants } from '../../app/utils';

const { expect } = chai;
chai.use(chaiHttp);
let artistToken;
let userToken;
let albumId;
let songId;
let playlistId;
let id;
const path = 'test/integration/test.png';
const picturePath = 'test/integration/test.png';
const musicPath = 'test/integration/test.mp3';
const {
  USER_ALREADY_EXIST,
  FORBIDDEN
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
    it('should allow an artist create an album successfully', (done) => {
      chai.request(app).post('/album/').set({ Authorization: `Bearer ${artistToken}` })
        .field('albumName', albumInfo.albumName)
        .field('description', albumInfo.description)
        .field('genre', albumInfo.genre)
        .attach('pictures', path)
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Album created successfully');
          expect(res.statusCode).to.equal(201);
          albumId = res.body.data.id;
          done();
        });
    });
    it('should throw an error when a user tries to add an album', (done) => {
      chai.request(app).post('/album/').set({ Authorization: `Bearer ${userToken}` })
        .field('albumName', albumInfo.albumName)
        .field('description', albumInfo.description)
        .field('genre', albumInfo.genre)
        .attach('pictures', path)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
  });
  describe('Create song', () => {
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
          expect(res.statusCode).to.equal(201);
          songId = res.body.data.id;
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
          expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
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
    it('should throw an error when the artist is not logged in', (done) => {
      chai.request(app).post('/song/').set({ Authorization: '' })
        .field('name', songInfo.name)
        .field('lyrics', songInfo.lyrics)
        .field('genre', songInfo.genre)
        .attach('pictures', picturePath)
        .attach('music', musicPath)
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('You need to be signed in');
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
  describe('Rating Route', () => {
    it('should allow a user rate a song successfully', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .send({ rating: 3 })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Rating created successfully');
          expect(res.statusCode).to.equal(201);
          done();
        });
    });
    it('should throw an error when an artist tries to rate a song', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${artistToken}` })
        .send({ rating: 3 })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('should throw an error when the song Id does not exist', (done) => {
      chai.request(app).post(`/rating/${albumId}`).set({ Authorization: `Bearer ${userToken}` })
        .send({ rating: 3 })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('Song does not exist');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
    it('should throw an error if the user is not logged in', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: '' })
        .send({ rating: 3 })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('You need to be signed in');
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
    it('should throw an error if the rating is more than 5', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .send({ rating: 6 })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('rating can not be greater than 5');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('should throw an error if the rating is less than 1', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .send({ rating: 0 })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('rating can not be lesser than 1');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('should throw an error if rating is not inputted', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('rating is a required field');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('should throw an error if rating sent is an empty string', (done) => {
      chai.request(app).post(`/rating/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .send({ rating: '' })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('rating must be a number');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
  describe('User Route', () => {
    describe('Create playlist', () => {
      it('should allow a user create a playlist', (done) => {
        chai.request(app).post('/user/playlist').set({ Authorization: `Bearer ${userToken}` })
          .send({ playlistName })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist created successfully');
            expect(res.statusCode).to.equal(201);
            playlistId = res.body.data.id;
            id = playlistId;
            done();
          });
      });
      it('should throw an error if an artist tries to create a playlist', (done) => {
        chai.request(app).post('/user/playlist').set({ Authorization: `Bearer ${artistToken}` })
          .send({ playlistName })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
            expect(res.statusCode).to.equal(403);
            done();
          });
      });
      it('should throw an error if the playlist name is less than 3 characters', (done) => {
        chai.request(app).post('/user/playlist').set({ Authorization: `Bearer ${userToken}` })
          .send({ playlistName: 'c' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Playlist Name can not be lesser than 3 characters');
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
      it('should throw an error if the duplicate playlist name', (done) => {
        chai.request(app).post('/user/playlist').set({ Authorization: `Bearer ${userToken}` })
          .send({ playlistName: duplicatePlaylistName })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Playlist exists already.');
            expect(res.statusCode).to.equal(409);
            done();
          });
      });
    });
    describe('Add songs to playlist', () => {
      it('should allow a user add a song to the playlist', (done) => {
        chai.request(app).post('/user/add-song').set({ Authorization: `Bearer ${userToken}` })
          .query({ playlistId, id: `${songId}` })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist updated successfully');
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
      it('should throw an error if the user is not logged in', (done) => {
        chai.request(app).post('/user/add-song').set({ Authorization: '' })
          .query({ playlistId, songId })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('You need to be signed in');
            expect(res.statusCode).to.equal(401);
            done();
          });
      });
      it('should throw an error if an artist tries to create a playlist', (done) => {
        chai.request(app).post('/user/add-song').set({ Authorization: `Bearer ${artistToken}` })
          .query({ playlistId, songId })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
            expect(res.statusCode).to.equal(403);
            done();
          });
      });
      it('should throw an error if the song does not exist', (done) => {
        chai.request(app).post('/user/add-song').set({ Authorization: `Bearer ${userToken}` })
          .query({ playlistId, albumId })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Song does not exist');
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
      it('should throw an error if the playlist does not exist', (done) => {
        chai.request(app).post('/user/add-song').set({ Authorization: `Bearer ${userToken}` })
          .query({ playlistId: '15', songId })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Playlist does not exist');
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
    describe('Like a playlist', () => {
      it('should allow a user like/dislike a playlist', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: `Bearer ${userToken}` })
          .send({ decision: 'like' })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist liked successfully');
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
      it('should throw an error if the user is not logged in', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: '' })
          .send({ decision: 'like' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('You need to be signed in');
            expect(res.statusCode).to.equal(401);
            done();
          });
      });
      it('should throw an error if an artist tries to like a playlist', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: `Bearer ${artistToken}` })
          .send({ decision: 'like' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
            expect(res.statusCode).to.equal(403);
            done();
          });
      });
      it('should throw an error if the playlist does not exist', (done) => {
        chai.request(app).post('/user/playlist/likes/15').set({ Authorization: `Bearer ${userToken}` })
          .send({ decision: 'dislike' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Playlist does not exist');
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
      it('should throw an error if the decision sent is not allowed', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: `Bearer ${userToken}` })
          .send({ decision: 'love' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Please enter a valid decision');
            expect(res.statusCode).to.equal(400);
            done();
          });
      });
      it('should allow a user edit their decision', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: `Bearer ${userToken}` })
          .send({ decision: 'dislike' })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist disliked successfully');
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
      it('should change the user\'s decision to neutral', (done) => {
        chai.request(app).post(`/user/playlist/likes/${id}`).set({ Authorization: `Bearer ${userToken}` })
          .send({ decision: 'like' })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist liked successfully');
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
    });
    describe('Get a playlist by name', () => {
      it('should allow a user get a playlist', (done) => {
        chai.request(app).get('/user/playlist/').set({ Authorization: `Bearer ${userToken}` })
          .query({ name: `${playlistName}` })
          .end((err, res) => {
            expect(res.body.status).to.equal('success');
            expect(res.body.message).to.be.a('string').equal('Playlist fetched successfully');
            expect(res.statusCode).to.equal(200);
            done();
          });
      });
      it('should throw an error if the user is not logged in', (done) => {
        chai.request(app).get('/user/playlist/').set({ Authorization: '' })
          .query({ name: `${playlistName}` })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('You need to be signed in');
            expect(res.statusCode).to.equal(401);
            done();
          });
      });
      it('should throw an error if an artist tries to get a playlist', (done) => {
        chai.request(app).get('/user/playlist/').set({ Authorization: `Bearer ${artistToken}` })
          .query({ name: `${playlistName}` })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
            expect(res.statusCode).to.equal(403);
            done();
          });
      });
      it('should throw an error if the playlist name does not exist', (done) => {
        chai.request(app).get('/user/playlist/').set({ Authorization: `Bearer ${userToken}` })
          .query({ name: 'David' })
          .end((err, res) => {
            expect(res.body.status).to.equal('fail');
            expect(res.body.message).to.be.a('string').equal('Playlist name does not exist');
            expect(res.statusCode).to.equal(404);
            done();
          });
      });
    });
  });
  describe('Get songs', () => {
    it('should allow an user get all songs successfully', (done) => {
      chai.request(app).get('/song/').set({ Authorization: `Bearer ${userToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Songs fetched successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw an error when an artist tries to get a song', (done) => {
      chai.request(app).get('/song/').set({ Authorization: `Bearer ${artistToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('should throw an error when the user is not logged in', (done) => {
      chai.request(app).get('/song/').set({ Authorization: '' })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('You need to be signed in');
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
  describe('Get songs with ratings', () => {
    it('should allow an user get all songs with their average ratings', (done) => {
      chai.request(app).get('/song/rating').set({ Authorization: `Bearer ${userToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Songs fetched successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw an error when an artist tries to get a song', (done) => {
      chai.request(app).get('/song/rating').set({ Authorization: `Bearer ${artistToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal(FORBIDDEN);
          expect(res.statusCode).to.equal(403);
          done();
        });
    });
    it('should throw an error when the user is not logged in', (done) => {
      chai.request(app).get('/song/rating').set({ Authorization: '' })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('You need to be signed in');
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });
  describe('Get a single song with its average rating', () => {
    it('should allow an user get all songs with their average ratings', (done) => {
      chai.request(app).get(`/song/${songId}`).set({ Authorization: `Bearer ${userToken}` })
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Song fetched successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw an error when the user is not logged in', (done) => {
      chai.request(app).get(`/song/${songId}`).set({ Authorization: '' })
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('You need to be signed in');
          expect(res.statusCode).to.equal(401);
          done();
        });
    });
  });

  describe('Subscription Routes', () => {
    it('should allow an user get available subscriptions', (done) => {
      chai.request(app).get('/subscription')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Subscriptions fetched successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should allow a user get a subscription by id', (done) => {
      chai.request(app).get('/subscription/1')
        .end((err, res) => {
          expect(res.body.status).to.equal('success');
          expect(res.body.message).to.be.a('string').equal('Subscription fetched successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should throw error when a subscription with the given id is not found', (done) => {
      chai.request(app).get('/subscription/10')
        .end((err, res) => {
          expect(res.body.status).to.equal('fail');
          expect(res.body.message).to.be.a('string').equal('Subscription does not exist');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
});
