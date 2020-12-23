import { Message, Client } from 'discord.js';

export interface IDiscordArgs {
  message: Message;
  client: Client;
  args: string[];
}

export interface ICommand {
  name: string;
  execute(args: IDiscordArgs): Promise<any>;
}

export type ICommands = ICommand[];
