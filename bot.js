const { exec } = require("child_process");
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] })
const config = require("../config.json")

client.login(config.token);
client.on('ready', () => console.log('The Böt is ready!'));

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
			msg.channel.send("D'oh!")
			break;
		case '%back':
			console.log('BACK')
			exec("autohotkey ./ahk/previous.ahk")
			msg.channel.send("Mmm...")
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
			msg.channel.send("Cartoon Remote v1 for the Cartoon Player \n---------------- \nUsage: \n%skip - play next toon (DOH!) \n%back - play previous toon \n%pause - pause the video \n%play - resume the video \n%rewind - rewinds ~30sec \n%reboot - reboot the pc if shit broken \n%help - display bot usage info")
			break;
	}
});
