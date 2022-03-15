const { SlashCommandBuilder } = require('@discordjs/builders');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gh')
        .setDescription('Replies with GitHub information')
        .addSubcommand(subcommand =>
            subcommand
                .setName('release')
                .setDescription('Replies with the latest release'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('repo')
                .setDescription('Replies with the public repository link'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('author')
                .setDescription(`Replies with the author's GH`)),
    async execute(interaction) {
        switch(interaction.options.getSubcommand()) {
            case 'release':
                await exec('node ./src/REST-requests/release.js', async (error, stdout, stderr) => {
                    if(error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    interaction.reply(repoEmbed);
                })
                break;
            case 'repo':
                exec('node ./src/REST-requests/repo.js', async (error, stdout, stderr) => {
                    if(error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    if (stdout) {
                        var repoPart = require('../REST-requests/repo');
                        console.log(repoPart);
                    }
                })
                break;
            case 'author':
                exec('node ./src/REST-requests/author.js', (error, stdout, stderr) => {
                    if(error) {
                        console.log(`error: ${error.message}`);
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    interaction.reply(stdout);
                })
                break;
            default:
                interaction.reply('error');
        }
    }
}