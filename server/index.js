require("dotenv").config();

//For Express Server Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

//For Video Transcription
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath.path);

//JD Generator
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: '',
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { message } = req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 3000,
        temperature: 0.3,
    });
    res.json({ botResponse: response.data.choices[0].text });
});

function proceedWithApiCall(inputFilePath) {
    const form = new FormData();
    form.append('file', fs.readFileSync(inputFilePath), inputFilePath);
    form.append('model', 'whisper-1');
    const headers = {
        'Authorization': 'Bearer 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',
        'Content-Type': 'multipart/form-data',
        ...form.getHeaders(),
    };
    return axios.post('https://api.openai.com/v1/audio/translations', form, { headers })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

app.post('/video-transcribe', upload.single('video'), async (req, res) => {
    try {
        const file = req.file
        if (!file) return res.status(400).send('No file uploaded.');
        const inputFilePath = file.path;
        const outputFilePath = 'uploads/video.mp4';
        const supportedFormats = ['.mov', '.3gp', '.flv', '.avi', '.mp4'];
        const inputFileExtension = inputFilePath.substr(inputFilePath.lastIndexOf('.')).toLowerCase();

        if (!supportedFormats.includes(inputFileExtension)) return res.json({ error: true, message: 'Invalid file format' })

        if (inputFileExtension === '.mp4') {
            const response = await proceedWithApiCall(inputFilePath)
            const basePath = path.join(__dirname, 'uploads', file.originalname)
			fs.unlinkSync(basePath);
            return res.json({ error: false, transcribeText: response?.data?.text })
        }

        ffmpeg().input(inputFilePath).output(outputFilePath)
            .on('end', async () => {
                const response = await proceedWithApiCall(outputFilePath)
                const basePath = path.join(__dirname, 'uploads', file.originalname)
			    fs.unlinkSync(basePath);
                return res.json({ error: false, transcribeText: response?.data?.text })
            }).on('error', (err) => res.json({ error: true, message: err.message })).run();

    } catch (error) {
        res.json({ error: true, message: error.message })
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});