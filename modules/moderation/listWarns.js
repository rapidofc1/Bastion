/**
 * @file listWarns command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message) => {
  if (!message.member.hasPermission(this.help.userPermission)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userPermission);
  }

  if (!message.guild.warns || Object.keys(message.guild.warns).length <= 0) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.GREEN,
        description: 'No one has been warned yet.'
      }
    }).catch(e => {
      Bastion.log.error(e);
    });
  }

  let warnedUsers = [];
  for (let userID of Object.keys(message.guild.warns)) {
    warnedUsers.push(`${message.guild.members.get(userID).user.tag} - ${message.guild.warns[userID]} Warnings`);
  }

  message.channel.send({
    embed: {
      color: Bastion.colors.ORANGE,
      title: 'Warning List',
      description: warnedUsers.join('\n')
    }
  }).catch(e => {
    Bastion.log.error(e);
  });
};

exports.config = {
  aliases: [ 'warns' ],
  enabled: true
};

exports.help = {
  name: 'listWarns',
  botPermission: '',
  userPermission: 'KICK_MEMBERS',
  usage: 'listWarns',
  example: []
};
