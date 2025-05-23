/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
class Listener {
  constructor(playlistService, mailSender) {
    this._playlistService = playlistService;
    this._mailSender = mailSender;
    this.listenMessage = this.listenMessage.bind(this);
  }

  async listenMessage(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlist = await this._playlistService.getPlaylist(playlistId);
      console.log(playlist);
      const result = await this._mailSender.sendMail(targetEmail, JSON.stringify(playlist));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Listener;
