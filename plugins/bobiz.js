import fetch from 'node-fetch'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {
    await m.reply(wait)
    let res = await YesNo()
    let stiker = await createSticker(false, res.image, "bobiza ", (res.answer).toUpperCase(), 30)
        
    try {
        await m.reply(stiker)
    } catch (e) {
        throw eror
    }
}
handler.help = ["wasbot"]
handler.tags = ["sticker"]
handler.command = /^(wasbot)$/i

export default handler

async function YesNo() {
    const response = await fetch(
        `https://yesno.wtf/api`
    );
    const data = await response.json();
    return data;
}

async function createSticker(img, url, packName, authorName, quality) {
    let stickerMetadata = {
        type: 'full',
        pack: packName,
        author: authorName,
        quality
    }
    return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()
}
