var express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
app.use(express.static(__dirname + "/dist"));
const path = require("path");
const { Console, time } = require("console");
const { setTimeout } = require("timers");
app.use("/mafia", express.static(__dirname + "/mafia"));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/mafia/index.html"));
// });

var spectators = [];
var clients = [];
var clientsWantToPlay = clients; //helelik beledi soar deyisilecek
var players = [];
var lastPlayers = [];
var roles = {
  mafia: "Mafia",
  all: "Hərkəs",
  don: "Don",
  civil: "Vətəndaş",
  comisar: "Komisar",
  doctor: "Həkim",
};
var isDay = false;
var global_chat_storage = [];
var mafia_chat_storage = [];
var game_info_storage = [];
var start_info_storage = [];
var mafias;
var mafiaCount;

var mustBeChoose = [];

var oldDeadPlayer;
var deadPlayer = "no one";
var comisarKilledPlayer;


var mafiaChoose = [];
var civilChoose = [];


var comisarChooseId;
var doctorChooseId;
var mafiaChooseId;

var noOneDied = false;
var isComisarKill = false;

var isDoctorChoose = false;
var isMafiaChoose = false;
var isComisarChoose = false;

var isComisarNight = true;

var isGameStart = false;

var writers = [];
var mafiaWriters = [];

var mafiaCantChoose;

var timeout;

var messageCount = 0;

io.on("connection", (socket) => {

  //ilkin olaraq oyunun catini sadece birinci defe ucun cliente gonderir
  socket.on("wantGlobalMessages", () => {
    socket.emit("global_chat_messages", global_chat_storage);
  });

  //yeni client web seyfeye daxil olanda
  socket.on("newUserCome", ({username, picture}) => {
    clients.push({
      id: socket.id,
      username: username,
      picture: picture
    });

    socket.emit("your_id", socket.id);
    io.emit("userUpdate", {allUsers: clients, spectators: spectators, players: players});
  });

  //global chata yeni mesaj gelende
  socket.on("global_message_send", ({ sender, msg, pictureUrl, socketId }) => {

    global_chat_storage.push({
      sender: sender,
      msg: msg,
      pictureUrl: pictureUrl,
      socketId: socketId
    });

    if(writers.some(writer => writer.writerId == socketId)){
      var removeIndex = writers
          .map(function (item) {
            return item.writerId;
          })
          .indexOf(socketId);
      writers.splice(removeIndex, 1);
    }

    io.emit("global_message_send", { sender: sender, msg: msg, pictureUrl: pictureUrl, socketId: socketId, writers: writers });
  });

  socket.on("noLongerWriting", ({id, username, pictureUrl}) =>{
    if(writers.some(writer => writer.writerId === id)){
      var removeIndex = writers
          .map(function (item) {
            return item.writerId;
          })
          .indexOf(id);
      writers.splice(removeIndex, 1);
    }

    io.emit("someoneWriting", writers)

  });

  socket.on("onWriting", ({id, username, pictureUrl}) =>{

    if (writers.some(writer => writer.writerId === id)){
      var removeIndex = writers
          .map(function (item) {
            return item.writerId;
          })
          .indexOf(id);
      writers.splice(removeIndex, 1);
    }
    writers.push({
      writerId: id,
      username: username,
      pictureUrl: pictureUrl
    });

    io.emit("someoneWriting", writers)
  });

  socket.on("distributeUser", async () => {
    if (clientsWantToPlay.length >= 5) {
      spectators = [];
      isGameStart = true;

      isDay = false;
      global_chat_storage = [];
      mafia_chat_storage = [];

      noOneDied = false;
      isComisarKill = false;

      isDoctorChoose = false;
      isMafiaChoose = false;
      isComisarChoose = false;

      isComisarNight = true;

      deadPlayer = "no one";

      players = [];
      game_info_storage = [];

      var messageCount = 0;

      await distrubuteRoles();
      await sendStartMessages();

      io.emit("startMessages", { start_info_storage: start_info_storage, players: players });
      io.emit("gameStart", { players: players, game_info: game_info_storage });

      mafias = players.filter((player) => {
        return player.role == roles.mafia || player.role == roles.don
      });
      mafiaCount = mafias.length;


      nextDay();

    }
  });

  socket.on("all_messages_rendered", () => {

    messageCount++;
    if (messageCount === players.length){

      let playersWithoutMafia = players.filter((player) => {
        return player.role != roles.mafia && player.role != roles.don
      });

      let message;
      message = {
        for: roles.mafia,
        content: "Qurbanınızı seçin...",
      };
      io.emit("mafiaChoose", ({message: message, players: playersWithoutMafia}));

      message = {
        for: roles.doctor,
        content: "Birini xilas etməyə çalışın",
      };
      io.emit("doctorChoose", ({message: message, players: players}));

      if(isComisarNight){
        message = {
          for: roles.comisar,
          content: "Mafianın kim olduğunu düşünürsünüz?",
        };
        io.emit("comisarChoose", ({message: message, players: players}));
      }

    }
  });

  socket.on("all_messages_rendered_in_day", () => {

    messageCount++;
    if(messageCount === players.length){
      let message = {
        for: roles.all,
        content: "Günahkarları müəyyən etmək və cəzalandırmaq zamanı gəldi. Səs vermə 50 saniyə davam edəcək",
      };
      io.emit("playerChoose", {message: message, players: players});
    }

  });

  socket.on("socketChooseCivil", ({senderId, username, choosenId}) =>{

    //adamin evvelceden secdiyi vardisa sifirlanir
    if(mafiaChoose.find(choosen => {
      return choosen.senderId == senderId
    })){
      var removeIndex = mafiaChoose
          .map(function (item) {
            return item.senderId;
          })
          .indexOf(senderId);
      mafiaChoose.splice(removeIndex, 1);
    }

    mafiaChoose.push({
      senderId: senderId,
      choosenId: choosenId,
      username: username
    });

    somebodyChoose(senderId);

    io.emit("mafiaChooseUpdate", mafiaChoose);


    if(mafias.length == mafiaChoose.length){
      isMafiaChoose = true;

      var choosenIds = mafiaChoose.map((choosens) => {
        return choosens.choosenId
      });
      choosenIds.sort();
      // console.log("sortedarray:", choosenIds);


      var current = null;
      var cnt = 0;
      var highest_count = 0;
      var highest = null;
      var same_highest_count = 0;
      var same_highest = null;
      for (var i = 0; i < choosenIds.length; i++) {

        if(cnt > highest_count){
          highest_count = cnt;
          highest = current;
        }
        if(cnt == highest_count){
          same_highest_count = cnt;
          same_highest = current;
        }
        if (choosenIds[i] != current) {
          if (cnt > 0) {
            if(cnt > highest_count){
              highest_count = cnt;
              highest = current;
            }
            if(cnt == highest_count){
              same_highest_count = cnt;
              same_highest = current;
            }
            // console.log(current + ' comes --> ' + cnt + ' times\n\n\n');
          }
          current = choosenIds[i];
          cnt = 1;
        } else {
          cnt++;
        }
      }
      if (cnt > 0) {
        if(cnt > highest_count){
          highest_count = cnt;
          highest = current;
        }
        if(cnt == highest_count){
          same_highest_count = cnt;
          same_highest = current;
        }
        // console.log(current + ' comes --> ' + cnt + ' times\n\n\n');
      }

      // console.log("en cox: " + highest + ' comes --> ' + highest_count + ' times\n\n\n');



      if(same_highest_count == highest_count && highest != same_highest){
        mafiaCantChoose = true;
        killProcess();
      }else{
        mafiaCantChoose = false;
        mafiaChooseId = highest;
        killProcess();
      }

    }

  });

  socket.on("socketDoctorChoose", ({senderId, choosenId}) =>{

    //adamin evvelceden secdiyi vardisa sifirlanir
    doctorChooseId = choosenId;

    somebodyChoose(senderId);
    killProcess();

  });

  socket.on("socketComisarChoose", ({senderId, choosenId}) =>{

    //adamin evvelceden secdiyi vardisa sifirlanir
    comisarChooseId = choosenId;

    somebodyChoose(senderId)
    killProcess();
  });

  //client web seyfeden cixanda
  socket.on("disconnect", () => {
    var removeIndex = clients
      .map(function (item) {
        return item.id;
      })
      .indexOf(socket.id);
    clients.splice(removeIndex, 1);

    var removeIndex = spectators
      .map(function (item) {
        return item.id;
      })
      .indexOf(socket.id);
      spectators.splice(removeIndex, 1);

      var removeIndex = players
      .map(function (item) {
        return item.id;
      })
      .indexOf(socket.id);
      players.splice(removeIndex, 1);

      io.emit("userUpdate", {allUsers: clients, spectators: spectators, players: players});
  });

  //mafia chata yeni mesaj gelende
  socket.on("mafia_message_send", ({ sender, msg }) => {
    mafia_chat_storage.push({
      sender: sender,
      msg: msg,
    });
    io.emit("mafia_message_send", { sender: sender, msg: msg });
  });

  socket.on("socketChooseMafia", ({senderId, username, choosenId}) =>{

    //adamin evvelceden secdiyi vardisa sifirlanir
    if(civilChoose.find(choosen => {
      return choosen.senderId == senderId
    })){
      var removeIndex = civilChoose
      .map(function (item) {
        return item.senderId;
      })
      .indexOf(senderId);
      civilChoose.splice(removeIndex, 1);
    }

    civilChoose.push({
      senderId: senderId,
      choosenId: choosenId,
      username: username
    });
    io.emit("playerChooseUpdate", civilChoose);


    // console.log('\n\n\n');
    // console.log("players lenghst:", players.length);
    // console.log('\n\n\n');
    // console.log("civilChoose lenght:", civilChoose.length);
    if(players.length == civilChoose.length){
      var choosenIds = civilChoose.map((choosens) => {
        return choosens.choosenId
      });
      choosenIds.sort();
      // console.log("sortedarray:", choosenIds);
      

      var current = null;
      var cnt = 0;
      
      var highest_count = 0;
      var highest = null;

      var same_highest_count = 0;
      var same_highest = null;

      for (var i = 0; i < choosenIds.length; i++) {

          if(cnt > highest_count){
            highest_count = cnt;
            highest = current;
          }
          if(cnt == highest_count){
            same_highest_count = cnt;
            same_highest = current;
          }

          if (choosenIds[i] != current) {
              if (cnt > 0) {
                if(cnt > highest_count){
                  highest_count = cnt;
                  highest = current;
                }
                if(cnt == highest_count){
                  same_highest_count = cnt;
                  same_highest = current;
                }
                // console.log(current + ' comes --> ' + cnt + ' times\n\n\n');
              }
              current = choosenIds[i];
              cnt = 1;
          } else {
              cnt++;
          }
      }
      if (cnt > 0) {
        if(cnt > highest_count){
          highest_count = cnt;
          highest = current;
        }
        if(cnt == highest_count){
          same_highest_count = cnt;
          same_highest = current;
        }
        // console.log(current + ' comes --> ' + cnt + ' times\n\n\n');
      }
      
      console.log("en cox: " + highest + ' comes --> ' + highest_count + ' times\n\n\n');
      console.log("ikinci en cox: " + same_highest + ' comes --> ' + same_highest_count + ' times\n\n\n');



      if(same_highest_count == highest_count && highest != same_highest){
        noOneDied = true;
      }else{
        deadPlayer = players.find(player => player.id == highest);      
        
        var removeIndex = players
        .map(function (item) {
          return item.id;
        })
        .indexOf(highest);
        players.splice(removeIndex, 1);
        noOneDied = false;
      }

      clearTimeout(timeout);
      nextDay();

    }

  });

  socket.on("mafiaNoLongerWriting", ({id, username}) =>{
    if(mafiaWriters.some(writer => writer.writerId == id)){
      
      var removeIndex = mafiaWriters
      .map(function (item) {
        return item.writerId;
      })
      .indexOf(id);
      mafiaWriters.splice(removeIndex, 1);
   
      io.emit("someMafiaWriting", mafiaWriters)
    }
  })

  socket.on("mafiaOnWriting", ({id, username}) =>{
    if(!mafiaWriters.some(writer => writer.id == id)){
      mafiaWriters.push({
        writerId: id,
        username: username
      });
      io.emit("someMafiaWriting", mafiaWriters)
    }
  })


});

function distrubuteRoles() {
  var mafiaCount = Math.floor((clientsWantToPlay.length / 5) * 2);
  isDay = false;
  var randomNumbers = [];

  while (randomNumbers.length < mafiaCount + 2) {
    var randomNumber = Math.floor(Math.random() * clients.length);
    if (randomNumbers.indexOf(randomNumber) === -1)
      randomNumbers.push(randomNumber);
  }

  // random mafia ve ya mafilar secilir
  for (let index = 0; index < mafiaCount; index++) {

    if(index == 0){
        players.push({
            role: roles.don,
            id: clients[randomNumbers[index]].id,
            username: clients[randomNumbers[index]].username,
            picture: clients[randomNumbers[index]].picture,
          });
    }else{
        players.push({
            role: roles.mafia,
            id: clients[randomNumbers[index]].id,
            username: clients[randomNumbers[index]].username,
            picture: clients[randomNumbers[index]].picture,
        });
    }

  }

  // random komisar secilir
  players.push({
    role:     roles.comisar,
    id:       clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount)]].id,
    username: clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount)]].username,
    picture:  clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount)]].picture,
  });

  // random hekim secilir
  players.push({
    role:     roles.doctor,
    id:       clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount) + 1]].id,
    username: clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount) + 1]].username,
    picture:  clients[randomNumbers[randomNumbers.length - (randomNumbers.length - mafiaCount) + 1]].picture,
  });

  //vetendaslar secilir
  function comparer(otherArray) {
    return function (current) {
      return (
        otherArray.filter(function (other) {
          return other.id == current.id;
        }).length == 0
      );
    };
  }
  var onlyPlayers = players.filter(comparer(clientsWantToPlay));
  var onlyClients = clientsWantToPlay.filter(comparer(players));
  result = onlyPlayers.concat(onlyClients);
  result.map((user) => {
    players.push({
      role: roles.civil,
      id: user.id,
      username: user.username,
      picture: user.picture,
    });
  });

  
  lastPlayers = players.slice();  
  
}

function sendStartMessages(){

  // start_info_storage.push({
  //   for: roles.all,
  //   content: "Oyun başlayır!",
  // });

  start_info_storage.push({
    for: roles.civil,
    content: "Sən Vətəndaşsan!. Sənin məqsədin mafiyanı tapmaq və şəhər iclasında yaramazları linç etməkdir",
  });

  start_info_storage.push({
    for: roles.don,
    content: "Sən - Donsan!. Tapşırığın yolunuzda dayanan hər kəsi öldürməkdir.",
  });

  start_info_storage.push({
    for: roles.mafia,
    content: "Sən - Mafiya san!. Tapşırığın Don'a itaət etmək və yolunuzda dayanan hər kəsi öldürməkdir. Bir gün siz də Don ola bilərsiniz.",
  });

  start_info_storage.push({
    for: roles.doctor,
    content: "Sən - Həkimsən!. Tapşırığın gecə birini xilas etməkdir",
  });

  start_info_storage.push({
    for: roles.comisar,
    content: "Sən Komisarsan!. Tapşırığın Mafianı tapmaqdır",
  });

}

function clearChoosens(){

  isDoctorChoose = false;
  isMafiaChoose = false;
  isComisarChoose = false;

  mafiaChoose = [];
  civilChoose = [];
  comisarChooseId = '';
  doctorChooseId = '';
  mafiaChooseId = '';

  messageCount = 0;

  mustBeChoose = [];
  players.forEach(player => {
    if(player.role == roles.doctor || player.role == roles.mafia || player.role == roles.don ){
      mustBeChoose.push({
        player: player,
        isChoose: false
      });
    }else if(player.role == roles.comisar && isComisarNight){
      mustBeChoose.push({
        player: player,
        isChoose: false
      });
    }
  })

}

function somebodyChoose(senderId){

  mustBeChoose.forEach(elem => {
    if(elem.player.id == senderId){
      elem.isChoose = true;
    }
  });

}

function nextDay(){
    clearChoosens();

    mafias = players.filter((player) => {
      return player.role == roles.mafia || player.role == roles.don
    });  
    playersWithoutMafia = players.filter((player) => {
      return player.role != roles.mafia && player.role != roles.don
    });  
    
    // console.log('\n\n');
    // console.log("players:", players);
    // console.log("playerswithout mafia:", playersWithoutMafia);
    // console.log("mafias:", mafias);
    // console.log('\n\n');

    // console.log('\n\n');
    // console.log("players lenght:", players.length);
    // console.log("playerswithout mafia lenght:", playersWithoutMafia.length);
    // console.log("mafias lenght:", mafias.length);
    // console.log('\n\n');


  //   if((players.length > 2 && mafias.length > playersWithoutMafia.length) || (players.length <= 2 && mafias.length >= playersWithoutMafia.length)){
  //
  //     isGameStart = false;
  //
  //     game_info_storage.push({
  //       for: roles.all,
  //       content: "Oyun bitdi mafialar qazandi"
  //     });
  //
  //
  //     mafiaWin();
  //
  //
  //     io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});
  //
  //   }
  //   else if(mafias.length == 0){
  //
  //   isGameStart = false;
  //
  //   game_info_storage.push({
  //     for: roles.all,
  //     content: "Oyun bitdi vetendaslar qazandi",
  //   });
  //
  //   civilWin();
  //
  //   io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});
  //
  // }

    //=================== gece ===================
    if(isDay == false){

      game_info_storage =[];

      game_info_storage.push({
        for: roles.all,
        content: "Həkim gecə növbəsinə çıxmaqa hazırlaşır...",
      });

      if(isComisarNight == false && players.some(player => player.role == roles.comisar)){
        game_info_storage.push({
          for: roles.comisar,
          content: "Bu gecə sizin növbəniz deyil",
        });
      }else{
        game_info_storage.push({
          for: roles.all,
          content: "Komisar gecə növbəsinə çıxmaqa hazırlaşır...",
        });
      }

      game_info_storage.push({
          for: roles.all,
          content: "Gecə düşür Yalnız cəsarətlilər və qorxmazlar şəhər küçələrinə çıxırlar. Səhər başlarını saymağa çalışacağıq...",
      });
      io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});


      timeout = setTimeout(() => {
        noOneDied = true;
        nextDay();
      }, 60000);
      isDay = true;

    }
    //=================== gece ===================



    //=================== gunduz ===================
    else{

      game_info_storage =[];

      game_info_storage.push({
        for: roles.all,
        content: "Günəş, səkilərdə gecə tökülən qanı qurudaraq, çıxır ...",
      });

      if(noOneDied == true){
        game_info_storage.push({
          for: roles.all,
          content: "Vətəndaşlar kimin mafiya olduğu ilə bağlı bir qərara gələ bilmədilər",
        });
      }else if(deadPlayer !== 'no one'){
        game_info_storage.push({
          for: roles.all,
          content: "Bu gün " + deadPlayer.role + " "+ deadPlayer.username +" vəhşicəsinə öldürüldü... Qonağın Don olduğunu söyləyirlər" ,
        });
      }


      if(isComisarKill == true && isComisarNight == false && players.some(player => player.role == roles.comisar)){
        game_info_storage.push({
          for: roles.all,
          content: "Komisar bu gecə mafianı tapdı və öldürdü. Mafia " + comisarKilledPlayer.username + " idi",
        });
      }else if(isComisarKill == false && isComisarNight == false && players.some(player => player.role == roles.comisar)){
        game_info_storage.push({
          for: roles.all,
          content: "Komisar bu gecə mafianı tapa bilmədi",
        });
      }

      isComisarKill = false;

      io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});

      // if((players.length > 2 && mafias.length > playersWithoutMafia.length) || (players.length <= 2 && mafias.length >= playersWithoutMafia.length)){
      //
      //   isGameStart = false;
      //
      //   game_info_storage.push({
      //     for: roles.all,
      //     content: "Oyun bitdi mafialar qazandi"
      //   });
      //
      //
      //   mafiaWin();
      //
      //
      //   io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});
      //
      // }
      // else if(mafias.length == 0){
      //
      //   isGameStart = false;
      //
      //   game_info_storage.push({
      //     for: roles.all,
      //     content: "Oyun bitdi vetendaslar qazandi",
      //   });
      //
      //   civilWin();
      //
      //   io.emit("dayChange", {players: players, game_info: game_info_storage, isDay: isDay});
      //
      // }

      timeout = setTimeout(() => {
        noOneDied = true;
        nextDay();
      }, 60000);

      isDay = false;

    }
    //=================== gunduz ===================

    
}

function killProcess(){

  if(mustBeChoose.every(element => element.isChoose === true)){
    
    if(players.some(player => player.role === roles.comisar)  && isComisarNight){
      //komisarin secimi ve mafiani tapib oldurmesi
      if(mafias.find(mafia => mafia.id === comisarChooseId)){
          comisarKilledPlayer = players.find(player => player.id === comisarChooseId);
        
          var removeIndex = players
          .map(function (item) {
            return item.id;
          })
          .indexOf(comisarChooseId);
          players.splice(removeIndex, 1);

          isComisarKill = true;
      }else{
        isComisarKill = false;    
      }
    }

    if(!mafiaCantChoose){
      if(mafiaChooseId === doctorChooseId && players.some(player => player.role === roles.doctor)){
        noOneDied = true;
      }else{
        noOneDied = false;    
        deadPlayer = players.find(player => player.id === mafiaChooseId);
        
        let removeIndex = players
        .map(function (item) {
          return item.id;
        })
        .indexOf(mafiaChooseId);
        players.splice(removeIndex, 1);
      }
    }else{
      noOneDied = true;
    }

    if(isComisarNight === true){
      isComisarNight = false;
      isComisarChoose = false;
      isComisarKill = false;
    }else{
      isComisarNight = true
    }

    clearTimeout(timeout);
    nextDay();

  }
}

function mafiaWin(){

  var winners = '';
  var losers = '';
  players.forEach(player => {
    if(player.role == roles.don || player.role == roles.mafia){
      winners += player.username  + ' ' + player.role + ' idi <br>'
    }else{
      losers += player.username  + ' ' +  player.role + ' idi <br>'
    }
  });

  
  lastPlayers.forEach(lastPlayer => {
    if(!players.some(player => player.id == lastPlayer.id)){
      losers += lastPlayer.username  + ' ' +  lastPlayer.role + ' idi <br>'
    }
  });
  game_info_storage.push({
    for: roles.all,
    content: "Qaliblər: <br>" + winners + '<br> Məğlublar:<br>' + losers,
  });

}

function civilWin(){

  var winners = '';
  var losers = '';
  players.forEach(player => {
    if(player.role != roles.don || player.role != roles.mafia){
      winners += player.username  + ' ' + player.role + ' idi <br>'
    }
  });

  
  lastPlayers.forEach(lastPlayer => {
    if(!players.some(player => player.id == lastPlayer.id)){
      losers += lastPlayer.username  + ' ' +  lastPlayer.role + ' idi <br>'
    }
  });
  game_info_storage.push({
    for: roles.all,
    content: "Qaliblər: <br>" + winners + '<br> Məğlublar:<br>' + losers,
  });

}

var port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log("listening on: " + port);
});
