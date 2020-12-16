let Discord = require('discord.js')
const fetch = require('node-fetch')

function send() {
    let code = document.getElementById("code").value
    let content = document.getElementById("content").value
    let url = document.getElementById("url").value
    let settings = { method: "Get" }
    let embed = JSON.parse(code)
    if (!url.length) return window.alert('Webhook URL is required!\n')

    fetch(url, settings)
        .then(res => res.json())
        .then((json) => {
            let webhookClient = new Discord.WebhookClient(json.id, json.token)
            let image = ('https://cdn.discordapp.com/avatars/' + json.id + '/' + json.avatar + '.png?size=128')
            webhookClient.send({ username: json.name, avatarURL: image, embeds: [embed], content: content })
            webhookClient.destroy()
            console.log('Mensagem enviada!')
            window.alert('Message sent!')
        })
}