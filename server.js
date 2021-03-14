const http = require("http");
const querystring = require("querystring");
const discord = require("discord.js");
const client = new discord.Client();

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          res.end("No post data");
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);

//ログ
client.on("ready", message => {
  console.log("Bot準備完了～");
  client.user.setPresence({ game: { name: "試験運用中" } });
});

//mute unmute
client.on('message', (message) => {
    const channel = message.channel
    const members = channel.members
    if (message.content.startsWith("/muteall")) {
        members.forEach(member => {
            member.voice.setMute(true)
            member.voice.setDeaf(true)
        });
        message.channel.send('Server muted');
    } else if (message.content.startsWith("/unmuteall")) {
        members.forEach(member => {
            member.voice.setMute(false)
            member.voice.setDeaf(false)
        });
        message.channel.send('Server unmuted');
    }
});




//risaの紹介
client.on("message", msg => {
  if (msg.content === "risaの紹介") {
    msg.channel.send(
      "ただいま試験運用中です、誤作動やエラーなどよく起きると思いますがご了承ください"
    );
  }
});

//募集コード
client.on("message", msg => {
  if (msg.content === "/アマアス募集") {
    msg.channel.send("アマングアスする人いますか@everyone？");
  }
});

//ゲームサーバー説明
client.on("message", msg => {
  if (msg.content === "SB-1") {
    msg.channel.send("Asia");
  }
});

client.on("message", msg => {
  if (msg.content === "SB-2") {
    msg.channel.send("NorthAmerica");
  }
});

client.on("message", msg => {
  if (msg.content === "SB-3") {
    msg.channel.send("EuropaEuropa");
  }
});

//通話
client.on("message", msg => {
  if (msg.content === "AC-1") {
    msg.channel.send("通話お願いします。");
  }
});

//挨拶
client.on("message", msg => {
  if (msg.content === "よろしくお願いします") {
    msg.channel.send("よろしくお願いします！");
  }
});

client.on("message", msg => {
  if (msg.content === "よろしくです") {
    msg.channel.send("よろしくお願いします！");
  }
});

client.on("message", msg => {
  if (msg.content === "お疲れ様でした") {
    msg.channel.send("お疲れ様でした！");
  }
});

//なんとなく
client.on("message", msg => {
  if (msg.content === "ミュートして") {
    msg.channel.send("は？自分でしろ！！人間やろ");
  }
});

//サーバー　検索

client.on("message", msg => {
  if (msg.content === "招待コード") {
    msg.channel.send("https://discord.gg/PrdeNXebv2");
  }
});

client.on("message", msg => {
  if (msg.content === "ピクトセンス") {
    msg.channel.send("https://pictsense.com/#!/1613479062405_143");
  }
});


//不適切なメッセージのさくじょ
client.on('message',message=>{
 if (message.content.match(/しね|ころす|死ね|殺す|きっしょ|ゴミ|野獣先輩|糞|カス/)) {
   message.channel.send('不適切な表現が含まれていたため、今後気をつけるようお願いします');
  message.delete(100)
}
})
client.on('message',message=>{
if (message.content.match(/不適切な表現が含まれていたため、削除しました。/)) {
        message.delete(3000)
   }
});




//コインゲーム
client.on('message', message => {
if(message.content === '！コインゲーム'){
var array = [":dvd:omote", ":cd:ura"];
message.channel.send(array[Math.floor(Math.random() * array.length)]);
console.log(array[Math.floor(Math.random() * array.length)]);
}
})



//おみくじ
client.on("message", message => {
  if (message.author.id == client.user.id || message.author.bot) {
    return;
  }
  if (
    message.content.match(/!おみくじ/) ||
    (message.isMemberMentioned(client.user) &&
      message.content.match(/おみくじ/))
  ) {
    let arr = ["大吉", "吉", "凶", "中吉", "imposter", "変態"];
    let weight = [5, 30, 10, 15, 20, 3];
    lotteryByWeight(message.channel.id, arr, weight);
  } else if (message.isMemberMentioned(client.user)) {
    sendReply(message, "呼びましたか？");
  }
});

function lotteryByWeight(channelId, arr, weight) {
  let totalWeight = 0;
  for (var i = 0; i < weight.length; i++) {
    totalWeight += weight[i];
  }
  let random = Math.floor(Math.random() * totalWeight);
  for (var i = 0; i < weight.length; i++) {
    if (random < weight[i]) {
      sendMsg(channelId, arr[i]);
      return;
    } else {
      random -= weight[i];
    }
  }
  console.log("lottery error");
}
















  







if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

function sendReply(message, text) {
  message
    .reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  client.channels
    .get(channelId)
    .send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}
