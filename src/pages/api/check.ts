import { NextApiRequest, NextApiResponse } from "next";
import { getReservations } from "@/utils/reservation";
import {
  Channel,
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  TextChannel,
} from "discord.js";
import { EOL } from "os";

function isTextChannel(channel: Channel): channel is TextChannel {
  return channel.type === ChannelType.GuildText;
}

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const availableReservations = await getReservations();

  if (availableReservations.length === 0) {
    return res.status(200).json({ message: "Success" });
  }

  // Create a new client instance
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, async (bot) => {
    const message = `Kirby Cafe reservations are available for the following dates: ${EOL}${availableReservations
      .map((reservation) => reservation.formattedDate)
      .join(EOL)}`;

    const channel = client.channels.cache.get(
      `${process.env.DISCORD_CHANNEL_ID}`
    );

    if (!channel || !isTextChannel(channel)) return;

    const previousMessages = await channel.messages.fetch({ limit: 1 });

    // We don't want to spam the channel with the same message
    if (previousMessages.first()?.content === message) return;

    await channel.send(message);
  });

  await client.login(process.env.DISCORD_BOT_TOKEN);

  return res.status(200).json({ message: "Success" });
}
