const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')

exports.drawProfilePicture = (username) => {
    const canvas = createCanvas(512, 512)
    const ctx = canvas.getContext('2d')
    
    // Write "Awesome!"
    // ctx.font = '30px Impact'
    // ctx.rotate(0.1)
    // ctx.fillText('Awesome!', 50, 100)
    
    // Draw line under text
    // var text = ctx.measureText('Awesome!')
    // ctx.strokeStyle = 'rgba(0,0,0,0.5)'
    // ctx.beginPath()
    // ctx.lineTo(50, 102)
    // ctx.lineTo(50 + text.width, 102)
    // ctx.stroke()
    
    ctx.save();
    ctx.beginPath();
    ctx.arc(256, 256, 256, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    
    return loadImage(`public/${username}.png`).then((image) => {
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
        //out.on('finish', () =>  console.log('The PNG file was created.'))
    })
}
