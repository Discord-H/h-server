import { ICommands, IDiscordArgs } from '@shared/core/Command';

import { WarnUserController } from '@modules/users/useCases/warnUser/WarnUserController';

export const cmds: ICommands = [
  {
    name: 'cum',
    execute: async ({ message }: IDiscordArgs): Promise<void> => {
      await message.channel.send('ass');
    },
  },
  {
    name: 'warn',
    execute: new WarnUserController().execute,
  },
  {
    name: 'dashboard',
    execute: async ({ message }: IDiscordArgs): Promise<void> => {
      await message.channel.send(
        'Aqui está a dashboard do server: https://hbot.vercel.app/'
      );
    },
  },
];
