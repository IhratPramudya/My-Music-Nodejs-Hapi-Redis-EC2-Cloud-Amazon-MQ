/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');
const playlistMap = require('./utils/playlistMap');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistId) {
    const query = {
      text: `
      SELECT playlists.id, playlists.name FROM playlists
      LEFT JOIN users ON "playlists"."userId" = "users"."id" WHERE "playlists"."id" = $1
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    const songsQUery = {
      text: `SELECT songs.id, songs.title, songs.performer FROM songs 
      LEFT JOIN playlist_songs ON "playlist_songs"."song_id" = "songs"."id" WHERE "playlist_songs"."playlist_id" = $1
      `,
      values: [playlistId],
    };

    const result2 = await this._pool.query(songsQUery);

    return playlistMap(result.rows[0], result2.rows);
  }
}

module.exports = PlaylistService;
