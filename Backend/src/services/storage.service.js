const ImageKit = require("@imagekit/nodejs").default

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
})

async function uploadFile({ buffer, fileName, folder = "" }) {

    const file = await client.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder: folder
    })
    
    return file
}


module.exports = {
    uploadFile
}
