const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays user's selected music request")
    .addStringOption((option) =>
      option
        .setName("request")
        .setDescription("Requested Song")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.member.voice.channel;
    console.log("Channel " + channel);
    const player = useMasterPlayer();
    if (!channel)
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
    const query = interaction.options.getString("request"); // we need input/query to play
    console.log(interaction.options);
    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
      });

      return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
