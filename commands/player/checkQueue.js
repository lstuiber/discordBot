const { SlashCommandBuilder } = require("discord.js");
const { useQueue } = require("discord-player");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Shows the size of the queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (queue == null) {
      await interaction.reply("There's nothing in the queue! Add some songs!");
    } else if (queue.tracks.size == 0) {
      const currentTrack = queue.currentTrack; //Gets the current track being played
      await interaction.reply(
        "There's nothing in the queue! Add some songs! \n\nCurrently playing:\n" +
          currentTrack
      );
    } else {
      const tracks = queue.tracks.toArray(); //Converts the queue into a array of tracks
      const currentTrack = queue.currentTrack; //Gets the current track being played

      for (let i = 0; i < queue.tracks.size; i++) {
        tracks[i] = i + 1 + ". " + tracks[i] + "\n";
      }

      await interaction.reply(
        "Queued:\n\n" +
          tracks.join("") +
          "\nCurrently playing:\n" +
          currentTrack
      );
    }
  },
};
