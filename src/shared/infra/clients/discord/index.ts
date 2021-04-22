import { container } from 'tsyringe';

import { ILoggerProvider } from '@shared/containers/providers/models/ILoggerProvider';

import { Discord } from './client';

const client = new Discord();

const loggerProvider = container.resolve<ILoggerProvider>('LoggerProvider');

client.on('ready', () => {
  loggerProvider.log({ message: 'Discord Client ready' });
});

client.on('message', async (message) => {
  if (!message.content.startsWith(client.prefix) || message.author.bot) return;

  const args = message.content.slice(client.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  await client.commands.get(command).execute({
    message,
    args,
    client,
  });
});

client.login(process.env.DISCORD_TOKEN);
