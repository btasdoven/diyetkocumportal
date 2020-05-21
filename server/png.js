const { registerFont, createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

registerFont(path.resolve(__dirname, './assets/fonts/Prompt-Regular.ttf'), { family: 'Prompt', weight: '100' })
// registerFont(path.resolve(__dirname, './assets/fonts/Prompt-Bold.ttf'), { family: 'Prompt Bold' })
// registerFont(path.resolve(__dirname, './assets/fonts/Prompt-Regular.ttf'), { family: 'Prompt Regular' })

exports.drawProfilePicture = (username) => {
    const canvas = createCanvas(512, 512)
    const ctx = canvas.getContext('2d')

    ctx.save();
    ctx.beginPath();
    ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    return loadImage(`public/${username}/${username}.png`).then((image) => {
        ctx.drawImage(image, 0, 0, 512, 512)
    
        ctx.beginPath()
        ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
        ctx.strokeStyle = "rgb(252, 81, 133)";
        ctx.lineWidth = 24;
        ctx.stroke();
    
        ctx.beginPath();
        ctx.arc(0, 0, 256, 0, Math.PI * 2, true);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    
        //const out = fs.createWriteStream(__dirname + '/test.png')
        const stream = canvas.createPNGStream()
        //stream.pipe(out)
        return Promise.resolve(stream);
    }).catch((err) => Promise.reject(err))
}

exports.drawCekilis = (unvan, name, username) => {
    const canvas = createCanvas(1024, 1024)
    const ctx = canvas.getContext('2d')
    
    return loadImage(`assets/templates/cekilis.png`).then((image) => {
        ctx.drawImage(image, 0, 0, 1024, 1024)

        var x = 625
        var y = 607
        var r = 148

        ctx.textAlign="center"
        ctx.font = "100 36px 'Prompt'"
        ctx.fillStyle = "#ffffffdd";
        ctx.fillText(unvan, x+r, y+2*r+50)
        ctx.fillText(name, x+r, y+2*r+90)

        ctx.save();
        ctx.beginPath();
        ctx.arc(x+r, y+r, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        return loadImage(`public/${username}/${username}.png`).then((image) => {
            ctx.drawImage(image, x, y, 2*r, 2*r)
        
            ctx.beginPath()
            ctx.arc(x+r, y+r, r, 0, Math.PI * 2, true);
            ctx.strokeStyle = "rgb(252, 81, 133)";
            ctx.lineWidth = 12;
            ctx.stroke();
        
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, true);
            ctx.clip();
            ctx.closePath();
            ctx.restore();
        
            var outPath = path.resolve(__dirname, `./public/${username}/cekilis.png`);
            ensureDirectoryExistence(outPath)
            const out = fs.createWriteStream(outPath)
            const stream = canvas.createPNGStream()
            stream.pipe(out)
            return new Promise((resolve, reject) => out.on('finish', () => resolve(`${username}/cekilis.png`)))
        }).catch((err) => Promise.reject(err))
    }).catch((err) => Promise.reject(err))
}