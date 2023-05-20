const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Play related songs automatically based on queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    console.log(queue);
    queue.setRepeatMode(3);
    await interaction.reply("Autoplay enabled!");
  },
};
