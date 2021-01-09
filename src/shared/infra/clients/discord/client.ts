import { Client, Collection, ClientOptions } from 'discord.js';

import { ICommand } from '@shared/core/Command';

import { discordConfig } from '@config/discord';

import { cmds } from './commands';

export class Discord extends Client {
  prefix: string;

  commands: Collection<string, ICommand>;

  constructor(options?: ClientOptions) {
    super(options);

    this.commands = new Collection();

    this.prefix = discordConfig.prefix;

    this.loadCmds();
  }

  private loadCmds() {
    cmds.forEach((Cmd) => {
      const Command = new Cmd();

      this.commands.set(Command.name, Command);
    });
  }
}
