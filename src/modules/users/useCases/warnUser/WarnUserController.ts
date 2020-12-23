/* eslint-disable no-case-declarations */
import { MessageEmbed, TextChannel, User } from 'discord.js';
import { container } from 'tsyringe';

import { IDiscordArgs } from '@shared/core/Command';

import { warnType } from './WarnUserDTO';
import { WarnUserUseCase } from './WarnUserUseCase';

export class WarnUserController {
  async execute({ args, client, message }: IDiscordArgs): Promise<any> {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
      return message.channel.send(
        'Você não tem permissão para executar esse comando'
      );
    }

    const [user_id, warn] = args as [string, warnType];

    const warnTypes: warnType[] = ['leve', 'grave', 'hedionda'];

    if (!user_id || !warn || !Number(user_id) || !warnTypes.includes(warn)) {
      return message.channel.send(
        'Argumentos inválidos, tenha certeza que eles estejam nessa ordem: !warn [ID do discord] [Tipo]'
      );
    }

    let userData: User;

    try {
      userData = await client.users.fetch(user_id).catch(null);
    } catch (err) {
      return message.channel.send('Usuário não encontrado');
    }

    const userDataEmbed = new MessageEmbed()
      .setColor('#dddddd')
      .setTitle(userData.username)
      .setThumbnail(userData.avatarURL())
      .setDescription('Usuário encontrado, warning em processo...');

    const msg = await message.channel.send(userDataEmbed);

    const warnUserUseCase = container.resolve(WarnUserUseCase);

    const data = await warnUserUseCase.execute({
      data: {
        discord_id: Number(userData.id),
        name: userData.username,
        profile_pic: userData.avatarURL(),
      },
      warn,
    });

    await msg.delete();

    const member = await message.guild.members.fetch({
      user: userData,
    });

    const warningChannel = (await client.channels.fetch(
      '785302446087995392'
    )) as TextChannel;

    switch (data) {
      case 'even':
        const evenMuter = await message.guild.roles.fetch('785483905075511326');
        member.roles.add(evenMuter);
        return warningChannel.send(`<@${userData.id}> levou even muter`);
      case 'mute':
        const mute = await message.guild.roles.fetch('785336030491836457');
        member.roles.add(mute);
        return warningChannel.send(`<@${userData.id}> levou mute`);
      default:
        return warningChannel.send(`<@${userData.id}> recebeu um warn`);
    }
  }
}