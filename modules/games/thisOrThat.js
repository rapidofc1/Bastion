/**
 * @file thisOrThat command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

const question = require('../../data/thisOrThat.json');

exports.run = (Bastion, message) => {
  message.channel.send({
    embed: {
      color: Bastion.colors.BLUE,
      description: question[Math.floor(Math.random() * question.length)]
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'thisthat' ],
  enabled: true
};

exports.help = {
  name: 'thisOrThat',
  botPermission: '',
  userPermission: '',
  usage: 'thisOrThat',
  example: []
};
