const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("offloop")
    .setDescription("Turn off any looping mode"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    console.log(queue);
    queue.setRepeatMode(0);
    await interaction.reply("Turned off looping!");
  },
};
