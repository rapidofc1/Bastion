/*
 * Copyright (C) 2017 Sankarsan Kampa
 *                    https://sankarsankampa.com/contact
 *
 * This file is a part of Bastion Discord BOT.
 *                        https://github.com/snkrsnkampa/Bastion
 *
 * This code is licensed under the SNKRSN Shared License. It is free to
 * download, copy, compile, use, study and refer under the terms of the
 * SNKRSN Shared License. You can modify the code only for personal or
 * internal use only. However, you can not redistribute the code without
 * explicitly getting permission fot it.
 *
 * Bastion BOT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY. See the SNKRSN Shared License for
 * more details.
 *
 * You should have received a copy of the SNKRSN Shared License along
 * with this program. If not, see <https://github.com/snkrsnkampa/Bastion/LICENSE>.
 */

exports.run = (Bastion, message, args) => {
  if (args.length < 1) {
    return message.channel.sendMessage('', {embed: {
      color: Bastion.colors.yellow,
      title: 'Usage',
      description: `\`${Bastion.config.prefix}${this.help.usage}\``
    }}).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  if (!(role = message.mentions.roles.first())) {
    role = message.guild.roles.find('name', args.join(' '));
  }

  if (role) {
    let users = [];
    for (let i = 0; i < role.members.size; i++) {
      users.push(`**${role.members.map(r => r.user)[i].username}**#${role.members.map(r => r.user)[i].discriminator}`);
    }

    message.channel.sendMessage('', {embed: {
      color: Bastion.colors.blue,
      title: `List of Members in ${role.name} role:\n`,
      description: users.join('\n'),
      thumbnail: {
        url: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`,
      }
    }}).catch(e => {
      Bastion.log.error(e.stack);
    });
  }
  else {
    return message.channel.sendMessage('', {embed: {
      color: Bastion.colors.red,
      description: 'The specified role was not found.'
    }}).catch(e => {
      Bastion.log.error(e.stack);
    });
  }
};

exports.config = {
  aliases: []
};

exports.help = {
  name: 'inrole',
  description: 'Shows the list of all the users in a specified role.',
  permission: '',
  usage: 'inRole <Role Name|@role-mention>',
  example: ['inRole Role Name', 'inrole @roleMention']
};