const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips current track"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    queue.node.skip();
    await interaction.reply("Skipping song. Sadge...");
  },
};
