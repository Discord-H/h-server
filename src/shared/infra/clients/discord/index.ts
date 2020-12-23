import { Discord } from './client';

const client = new Discord();

client.on('ready', () => {
  console.log('Bot ready!');
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
