/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const amqp = require('amqplib');
const Listener = require('./listener');
const MailSender = require('./MailSender');
const PlaylistService = require('./PlaylistService');

const init = async () => {
  const playlistService = new PlaylistService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistService, mailSender);

  const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
  const channel = await connection.createChannel();

  channel.assertQueue('export:playlist', {
    durable: true,
  });

  channel.consume('export:playlist', listener.listenMessage, { noAck: true });
};

init();
