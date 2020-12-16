let Discord = require('discord.js')
let readline = require('readline')
const clearModule = require('clear-module')
const fetch = require('node-fetch')

var leitor = readline.createInterface({ input: process.stdin, output: process.stdout })

function send() {
    //----------------------------------------------------
    //Limpar cache das strings para que sejam atualizadas.
    clearModule('./message.json')
    clearModule('./config.json')
    //----------------------------------------------------
    let embed = require('./message.json')
    let config = require('./config.json')
    let settings = { method: "Get" }
    let url = config.webhookLink
    if (!url.length) return main('Nenhum link de webhook nas configurações, tente novamente!\n')

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            let webhookClient = new Discord.WebhookClient(json.id, json.token)
            let image = ('https://cdn.discordapp.com/avatars/' + json.id + '/' + json.avatar + '.png?size=128')

            webhookClient.send({ username: json.name, avatarURL: image, embeds: [embed], content: embed.content })
            webhookClient.destroy()
        })
    main()
}

function main(message) {
    console.clear()
    if (message != null) console.log(message)
    leitor.question("Deseja enviar a mensagem? (sim/s)\n", function (answer) {
        let resp = answer.toLowerCase()
        if (resp == "sim" || resp == "s") {
            send()
        } else return main()
    })
}

main()