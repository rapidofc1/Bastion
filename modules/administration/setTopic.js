/**
 * @file setTopic command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = async (Bastion, message, args) => {
  let channel = message.mentions.channels.first();
  let topic;
  if (!channel) {
    channel = message.channel;
    topic = args.join(' ');
  }
  else {
    topic = args.slice(1).join(' ').trim();
  }

  if (!channel.permissionsFor(message.member).has(this.help.userPermission)) {
    /**
     * User has missing permissions.
     * @fires userMissingPermissions
     */
    return Bastion.emit('userMissingPermissions', this.help.userPermission);
  }
  if (!channel.permissionsFor(message.guild.me).has(this.help.botPermission)) {
    /**
     * Bastion has missing permissions.
     * @fires bastionMissingPermissions
     */
    return Bastion.emit('bastionMissingPermissions', this.help.botPermission, message);
  }

  let color = Bastion.colors.GREEN;
  let title = 'Channel Topic Set';
  if (topic.length < 2) {
    topic = ' ';
    title = 'Channel Topic Removed';
    color = Bastion.colors.RED;
  }

  try {
    await channel.setTopic(topic);
    await message.channel.send({
      embed: {
        color: color,
        title: title,
        fields: [
          {
            name: 'Channel Name',
            value: `#${channel.name}`,
            inline: true
          },
          {
            name: 'Topic',
            value: channel.topic.length > 1 ? channel.topic : '-',
            inline: true
          }
        ]
      }
    });
  }
  catch (e) {
    Bastion.log.error(e);
  }
};

exports.config = {
  aliases: [ 'sett' ],
  enabled: true
};

exports.help = {
  name: 'setTopic',
  botPermission: 'MANAGE_CHANNELS',
  userPermission: 'MANAGE_CHANNELS',
  usage: 'setTopic [#channel-mention] [Channel Topic]',
  example: [ 'setTopic #channel-name New Topic', 'setTopic New Topic', 'setTopic' ]
};
