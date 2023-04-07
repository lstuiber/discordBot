const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: "10" }).setToken(token);

//deletes a local slash command. The last number refers to the ID of the command
//To find the id, click the command in discord, then right click on the dark area above the textbox to get ID
//This method will fail if it's not the localized command
//commenting out for not since it's not needed
// rest
//   .delete(
//     Routes.applicationGuildCommand(clientId, guildId, "1092263121042804807")
//   )
//   .then(() => console.log("Successfully deleted guild command"))
//   .catch(console.error);

// // for global commands
// rest
//   .delete(Routes.applicationCommand(clientId, "1079485350658969673"))
//   .then(() => console.log("Successfully deleted application command"))
//   .catch(console.error);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
