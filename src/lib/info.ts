import { join } from 'path'
import { IReply } from '../Typings'
import Utils from '../Utils'
export const info = (): IReply => {
    //eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(join(__dirname, '..', '..', 'package.json'))
    const deps = Object.keys(pkg.dependencies)
    return {
        body: `🤖 ${process.env.BOT_NAME} 🤖\n\n🌟 *Homepage:* ${pkg.homepage}\n\n🍀 *Repository:* ${
            pkg.repository.url
        }\n\n🍁 *Dependencies:*\n${deps.join(
            '\n'
        )}\n\n🌇 *Stickers:* https://www.npmjs.com/package/wa-sticker-formatter\n\n🛠️ *APIs & Tools:* https://express-is-fun.herokuapp.com/api/endpoints\n\n*-ᴡᴀ-ʙᴏᴛᴛᴏ-xʀᴇ-*`
    }
}

export const getRepoInfo = async (type: 'commits' | 'issues'): Promise<IReply> => {
    const data = await Utils.fetch(`https://api.github.com/repos/SomnathDas/Whatsapp-Botto-Xre/${type}`, {})
    if (!data[0]) return { body: '💮 *No issues open* 💮'}
    let body = `🌟 *WhatsApp Botto Xre-Recent ${type}* 🌟\n\n`
    const len = data.length < 5 ? data.length : 5
    if (type === 'issues') {
        for (let c = 0; c < len; c++) {
        body += `*#${c + 1}.*\n✉️ *Commit Message:* ${data[c].commit.message}\n📅 *Date:* ${
            data[c].commit.author.date
        }\n🔱 *Author:* ${data[c].commit.author.name}\n🍀 *URL*: ${data[c]['html_url']}\n\n`
        }
        return { body }
    }
    for (let i = 0; i < data.length; i++) {
        body += `*#${i + 1}.*\n\n🔴 *Title: ${data[0].title}*\n🔱 *User:* ${data[i].user.login}\n〽️ URL: ${data[i].url}\n\n`
    }
    return { body }
}