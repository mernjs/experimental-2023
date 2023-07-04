const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;


app.set('view engine', "ejs");
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('./video-stream');
});

app.get('/stream-video', (req, res) => {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "./kisikabhiakisikijan.mp4";
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 1024 * 1024; //1 MB
    const start = Number(range.replace(/\D/g, ""));
    console.log(start);
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(port, () => {
    console.log(`server start on port: ${port}`);
})