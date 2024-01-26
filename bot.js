const { exec } = require("child_process");
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] })
const config = require("../config.json")

client.login(config.token);
client.on('ready', () => console.log('The Böt is ready!'));

//join voice channel automatically
const channel = client.channels.cache.get("config.channelid");
  if (!channel) return console.error("The channel does not exist!");
  channel.join().then(connection => {
    // worked
    console.log("Successfully connected.");
  }).catch(e => {
    // error
    console.error(e);
  });
});

client.on("voiceStateUpdate", (oldVoiceState, newVoiceState) => {
	if (!newVoiceState) {return false};
    if (!newVoiceState.streaming && newVoiceState.id.includes(config.userid)) {
        console.log("not streaming run ahk");
		exec('autohotkey ./ahk/stream.ahk') // if streaming goes down stream again
    };
	})
	
client.on('message', (msg) => {
	switch (msg.content) {
		case '%skip':
			console.log('SKIP')
			exec("autohotkey ./ahk/next.ahk")
			msg.channel.send("Get on the ground!")
			break;
		case '%back':
			console.log('BACK')
			exec("autohotkey ./ahk/previous.ahk")
			msg.channel.send("Back up slowly...")
			break;
		case '%play':
		case '%pause':
			console.log('Paused')
			exec('autohotkey ./ahk/space.ahk')
			break;
		case '%rewind':
			for (let i = 0; i < 9; i++) {
				exec('autohotkey ./ahk/rewind.ahk')
			}
			break;
		case '%subtitle':
			console.log('subtitle toggled')
			exec('autohotkey ./ahk/subtitle.ahk')
			break;
		case '%update':
			console.log('Updating')
			msg.channel.send("Updating... bot will automatically restart.")
			exec('git pull') //nodemon will monitor this folder for changes and automatically restart the bot (applying changes)
			break;
		case '%reboot':
			console.log('Rebooting')
			msg.channel.send("Rebooting... please hold.")
			exec('reboot.bat')
			break;
		case '%stream':
			console.log('Toggle stream in discord')
			exec('autohotkey ./ahk/stream.ahk') //this is only here if for whatever reason discord stops streaming and you need to toggle it back on
			break;
		case '%help':
			console.log('Help')
			msg.channel.send("**__Cartoon Remote v1 for the Patrol Player__**\n\n**%skip** - play next tv episode \n**%back** - play previous tv episode \n**%pause** - pause the video \n**%play** - resume the video \n**%rewind** - rewinds ~30sec \n**%subtitle** - switch subtitle file \n**%reboot** - reboot the pc if shit broken \n**%stream** - toggle share screen in discord (may fix lag) \n**%help** - display bot usage info")
			break;
	}
});
