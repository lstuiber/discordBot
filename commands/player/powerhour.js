const { SlashCommandBuilder } = require("discord.js");
var powerFlag = require("../../index");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("powerhour")
    .setDescription("Turns current player into a power hour!"),
  execute(interaction) {
    console.log("power" + powerFlag.powerFlag.value);
    console.log("power2" + powerFlag);
    console.log("interaction id: " + interaction.channel.id);
    if (!powerFlag.powerFlag.value) {
      powerFlag.powerFlag.value = true;
      console.log("PowerFlag change: " + powerFlag.powerFlag.value);
      interaction.reply("Power Hour Enabled!");
    } else {
      powerFlag.value = false;
      interaction.reply("Power Hour Disabled!");
    }
  },
};
