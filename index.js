const Discord = require('discord.js');
const bot = new Discord.Client();

var phraseListe = [
    'Salut Gauthier mon héros',
    'Hey Nigga',
    'Tu sais que tu es mon meilleur amis Gauthier ?',
    `Gauthier, Comment ça ce fait qu'Aurélie est chez moi ?`,
    `Gauthier tu sais comment je sais que tu as une grosse bite ?`,
];

var trackedUser = 'Deymysoss';

bot.login('************************************');

//Event lors de l'envoi d'un message
bot.on('message',function (message) {
    var regex = /!gauthier/;
    if (regex.test(message.content)) {
        message.channel.send('bougnoule');
    }
});

//Event lorsque le client est ready
bot.on('ready',function () {

    const channel = bot.channels.filter(function (channel) {
        return channel.name == 'débat';;
    }).array()[0];

    var compteur = 0;

    //Fonction s'executant toutes les 5sec qui permet de vérifier le status des connections du serveur
    setInterval(function () {

        var users = bot.users.array();
        var randomNumber = Math.floor(Math.random() * phraseListe.length);

        users.forEach(function (user) {

            //Si l'utilisateur est connecté et que le message n'a pas était send
            if (user.presence.status != 'offline' && user.username == trackedUser && (compteur < 1)) {

                channel.send(phraseListe[randomNumber]).catch((error) => { console.log(error)} );
                compteur++;

                //Si l'utilisateur n'est pas connecté et que le message a déja était send alors on reset le compteur
            } else if (user.presence.status == 'offline' && user.username == trackedUser && (compteur == 1)) {

                compteur = 0;

            }

        });

    },1000);

});
