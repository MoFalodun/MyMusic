export default {
  createPlaylist: `
      INSERT INTO playlist(
        playlist_name,
        owner_id
      ) VALUES($1, $2)
      ON CONFLICT ON CONSTRAINT uniq_user_playlist
      DO UPDATE SET playlist_name=EXCLUDED.playlist_name
      RETURNING *
     ;`,
  fetchPlaylistByName: 'SELECT * FROM playlist WHERE playlist_name ILIKE $1 AND owner_id = $2;',
  fetchPlaylistById: 'SELECT * FROM playlist WHERE id = $1;',
  fetchPlaylistByOwner: 'SELECT * FROM playlist WHERE id = $1 AND owner_id = $2;',
  createPlaylistSongs: `
      INSERT INTO playlist_songs(
        song_id,
        playlist_id
      ) VALUES($1, $2)
      ON CONFLICT ON CONSTRAINT uniq_song_details
      DO UPDATE SET song_id=EXCLUDED.song_id
      RETURNING *;
  `,
  fetchPlaylistSongs: 'SELECT * FROM playlist_songs WHERE playlist_id = $1',
  createPlaylistLikes: `
  INSERT INTO playlist_likes(
    user_id,
    playlist_id,
    decision
  ) VALUES($1, $2, $3)
  ON CONFLICT ON CONSTRAINT uniq_user_likes
  DO UPDATE SET decision=EXCLUDED.decision
  RETURNING *;
`,
  fetchPlaylistLikes: 'SELECT decision FROM playlist_likes WHERE playlist_id = $1 AND user_id = $2',
};
