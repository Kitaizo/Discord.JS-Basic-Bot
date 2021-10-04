const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").prefix;

module.exports = {
  name: "help",
  aliases : ['menu'],
  description: "Hướng dẫn và xem danh sách lệnh",
  run: async (client, message, args) => {


    const roleColor =
      message.guild.me.displayHexColor === "#000000"
        ? "#ffffff"
        : message.guild.me.displayHexColor;

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "Không có tên lệnh.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir.toUpperCase(),
          value: cmds.length === 0 ? "Tiến trình." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Bạn cần giúp đỡ? Đây là danh sách các lệnh:")
        .addFields(categories)
        .setDescription(
          `Hướng dẫn: Dùng \`${prefix}help\`  <lệnh> để xem chi tiết.\nVí dụ: \`${prefix}help help\`.`
        )
        .setFooter(
          `Yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Lệnh không hợp lệ! Dùng \`${prefix}help\` <lệnh> để sử dụng!`)
          .setColor("FF0000");
        return message.channel.send(embed);
      }

      const embed = new MessageEmbed()
        .setTitle("CHI TIẾT LỆNH:")
        .addField("❯ PREFIX:", `\`${prefix}\``)
        .addField(
          "❯ LỆNH:",
          command.name ? `\`${command.name}\`` : "Không tìm thấy lệnh này."
        )
        .addField(
          "❯ LỆNH PHỤ:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Chưa thêm lệnh phụ."
        )
        .addField(
          "❯ DÙNG:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "❯ MÔ TẢ:",
          command.description
            ? command.description
            : "Không có mô tả."
        )
        .setFooter(
          `Yêu cầu bởi ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send(embed);
    }
  },
};
