const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Đo độ trễ của DiozBot VN',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {
        const msg = await message.channel.send(`Đang kiểm tra...`)
        const embed = new MessageEmbed()
            .setTitle('DiozBot VN Ping!')
            .setDescription(`Độ trễ: ${client.ws.ping} ms\nĐộ trễ tin nhắn: ${Math.floor(msg.createdAt - message.createdAt)} ms!`)
            await message.channel.send(embed)
            msg.delete()

    }
}
