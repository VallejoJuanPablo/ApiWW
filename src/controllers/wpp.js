/* 
const WhatsAppWeb = require('baileys')

const client = new WhatsAppWeb() 
 */

const {
    WAConnection,MessageType
    } = require('@adiwajshing/baileys')

    let client = new WAConnection()

// CONECTA WHATS - SERVIDOR
module.exports.conectApi = async (req, res) => {
    client.connect()
    .then (([user, chats, contacts, unread]) => {
        res.jsonp({mensaje: 'Autenticación exitosa'});
    })
    .catch (err => console.log(err) )
}


// ENVIAR MENSAJES

module.exports.sendMessage = async (req, res) => {
options = {
    quoted: null,
    timestamp: new Date()
}
const id = `${req.body.phone}@s.whatsapp.net`
const exists = await client.isOnWhatsApp (id)
if (exists) console.log (`${id} exists on WhatsApp, as jid: ${exists.jid}`)
const sentMsg  =  await client.sendMessage(`${req.body.phone}@s.whatsapp.net`, req.body.body, MessageType.text)
.then( res.jsonp({mensaje:'Notificación enviada'}))
.catch (err => console.log(err) )

}


