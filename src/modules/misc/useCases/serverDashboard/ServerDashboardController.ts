import { ICommand, IDiscordArgs } from '@shared/core/Command';

export class ServerDashboard implements ICommand {
  public readonly name = 'dashboard';

  async execute({ message }: IDiscordArgs): Promise<any> {
    return message.channel.send(
      `Aqui está a dashboard do servidor: ${process.env.FRONTEND_URL} `
    );
  }
}
