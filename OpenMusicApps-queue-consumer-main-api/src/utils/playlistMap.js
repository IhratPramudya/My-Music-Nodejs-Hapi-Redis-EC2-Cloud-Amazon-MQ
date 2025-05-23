const playlistMap = ({ id, name }, song) => ({
  playlist: {
    id,
    name,
    songs: [...song],
  },
});

module.exports = playlistMap;
