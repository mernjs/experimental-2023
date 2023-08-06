import React, { useState, useRef } from "react";
import Loading from "./Loading";

const VideoTranscribe = () => {
    const chatLogRef = useRef(null);

    const [loader, setLoader] = useState(null)
    const [type, setType] = useState('jd')
    const [inputPrompt, setInputPrompt] = useState('')
    const [files, setFiles] = useState(null)
    const [botResoponse, setBotResponse] = useState("");

    const videoTranscribe = async () => {
        try {
            setLoader(true)
            setBotResponse("")
            const formData = new FormData();
            formData.append('video', files);
            const response = await fetch("http://localhost:4000/video-transcribe", {
                method: "POST",
                body: formData,
            });
            const res = await response.json();
            setLoader(false)
            let transcribeText = res.transcribeText
            let index = 1;
            let msg = setInterval(() => {
                setBotResponse(transcribeText.slice(0, index));
                if (index >= transcribeText.length) clearInterval(msg);
                index++;
            }, 50);
        } catch (err) {
            setLoader(false)
        }
    }

    const generateJD = async (e) => {
        try {
            setLoader(true)
            setBotResponse("")
            setInputPrompt("")
            const response = await fetch("http://localhost:4000/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: `Job Title - ${inputPrompt} \n\n As per the job title please create job description` }),
            });
            const data = await response.json();
            setLoader(false)
            let transcribeText = data.botResponse
            let index = 1;
            let msg = setInterval(() => {
                setBotResponse(transcribeText.slice(0, index));
                if (index >= transcribeText.length) clearInterval(msg);
                index++;
            }, 50);
        } catch (err) {
            setLoader(false)
        }
    };

    return (
        <div style={{padding: '20px'}}>
            <h3>I have created samples for both video transcriptions and job description generation.</h3>
            <div style={{ margin: '20px' }}>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value={"jd"}
                        checked={type === 'jd'}
                        onChange={(e) => {
                            setBotResponse("")
                            setInputPrompt("")
                            setFiles(null)
                            setType(e.target.value)
                        }}
                        style={{
                            width: '20px',
                            height: '20px',
                            fontSize: '20px'
                        }}
                    /><span style={{margin: '10px'}}>Job Description</span></label> &nbsp;&nbsp;&nbsp;&nbsp;

                <label>
                    <input
                        type="radio"
                        name="type"
                        value={"video"}
                        checked={type === 'video'}
                        onChange={(e) => {
                            setBotResponse("")
                            setInputPrompt("")
                            setFiles(null)
                            setType(e.target.value)
                        }}
                        style={{
                            width: '20px',
                            height: '20px',
                            fontSize: '20px'
                        }}
                    /><span style={{margin: '10px'}}>Video Transcribe</span></label>
            </div>

            {type === 'jd' &&
                <div style={{ marginTop: '20px' }}>
                    <input
                        placeholder="Enter Job Title"
                        style={{
                            width: '400px',
                            height: '40px'
                        }}
                        type="text"
                        onChange={(e) => setInputPrompt(e.target.value)}
                    />
                    <button
                        style={{ width: '220px', height: '46px' }}
                        onClick={generateJD}>
                        Generate Job Description
                    </button>
                </div>
            }

            {type === 'video' &&
                <div>
                    <input
                        style={{
                            width: '386px',
                            background: 'white',
                            padding: '10px'
                        }}
                        type="file"
                        onChange={(e) => setFiles(e.target.files[0])}
                    />
                    <button
                        style={{ width: '220px', height: '46px' }}
                        onClick={videoTranscribe}>
                        Video Transcribe
                    </button>
                </div>
            }

            <br /><br />
            <section className="chatBox">
                <div className="chatLogWrapper">
                    <div
                        className="chatLog"
                        key={'idx'}
                        ref={chatLogRef}
                        id={`navPrompt-${botResoponse.replace(/[^a-zA-Z0-9]/g, "-")}`}
                    >
                        <div className="botMessageMainContainer">
                            <div className="botMessageWrapper">
                                {loader ? <Loading /> :
                                    <div id="botMessage">
                                        {type === 'video' ? botResoponse : <pre>{botResoponse}</pre>}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default VideoTranscribe;
