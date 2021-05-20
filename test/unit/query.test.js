import { expect } from 'chai';
import query from '../fixtures/query';

import artistQueries from '../../app/db/queries/artist';
import userQueries from '../../app/db/queries/user';
import songQueries from '../../app/db/queries/song';

describe('QUERY FUNCTION TEST', () => {
  it('FETCH_USERS_QUERY', (done) => {
    const users = userQueries.fetchAllUsers;
    expect(users).to.equal(query.FETCH_USERS_QUERY);
    done();
  });
  it('FETCH_SONG_QUERY', (done) => {
    const songs = songQueries.fetchAllSongs;
    expect(songs).to.equal(query.FETCH_SONG_QUERY);
    done();
  });
  it('FETCH_SONG_BY_GENRE_QUERY', (done) => {
    const songByGenre = songQueries.fetchSongByGenre;
    expect(songByGenre).to.equal(query.FETCH_SONG_BY_GENRE_QUERY);
    done();
  });
  it('FETCH_ARTIST_QUERY', (done) => {
    const artists = artistQueries.fetchAllArtists;
    expect(artists).to.equal(query.FETCH_ARTIST_QUERY);
    done();
  });
});
