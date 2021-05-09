/* 
const WhatsAppWeb = require('baileys')

const client = new WhatsAppWeb() 
 */
const fs = require('fs');
const {
    WAConnection,MessageType
    } = require('@adiwajshing/baileys')

    let client = new WAConnection()

// CONECTA WHATS - SERVIDOR
module.exports.conectApi = async (req, res) => {
   
    client.connect()
    client.on('qr', (QR) => {
        res.jsonp({qr: QR});
        console.log(QR) 
    })
    client.on ('open', () => {
        // save credentials whenever updated
        console.log (`credentials updated!`)
        const authInfo = client.base64EncodedAuthInfo() // get all the auth info we need to restore this session
        fs.writeFileSync('./auth_info.json', JSON.stringify(authInfo, null, '\t')) // save this info to a file
    })
    .then (([user, chats, contacts, unread]) => {
        res.jsonp({mensaje: 'Autenticación exitosa'});
    })
    .catch (err => console.log(err) )
}

// CONECTA WHATS - SERVIDOR
module.exports.status = async (req, res) => {
    const resp = await client.getStatus()
        res.jsonp(resp); 
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

module.exports.reConectar = async () => {
    
    client.loadAuthInfo ('./auth_info.json') // will load JSON credentials from file
    await client.connect() 
}

