import React, { useState } from 'react'
import './TextSummarizer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste, faCopy } from '@fortawesome/free-regular-svg-icons'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import axios from 'axios'
import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../animations/LoadingIndicator'

const TextSummarizer = () => {
    const [data, setData] = useState("")
    const [msg, setMsg] = useState("")
    const [len, setLen] = useState(20)
    const [display, setDisplay] = useState("flex")
    const [type, setType] = useState(1)
    const submit = () => {
        if (!msg) {
            return toast.error("PLEASE Enter a Text First!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        }
        setData("")
        trackPromise(
            axios.post(`${process.env.REACT_APP_API_URL}/api`, {
                msg,
                len,
                type
            }))
            .then((res) => {
                setData(res.data)
            })
            .catch(error => {
                console.log(error);
                toast.error("PLEASE Enter Proper Text!", {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 1500,
                });
            })
    }

    const copyToClipboard = () => {
        if (data === "") {
            toast.error("Nothing to copy", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            navigator.clipboard.writeText(data);
            toast.success("Copied to Clipboard")
        }
    }

    const pasteText = async () => {
        const text = await navigator.clipboard.readText()
        if (text === "") {
            toast.error("Nothing to paste", {
                position: toast.POSITION.TOP_CENTER
            })
        }
        else {
            document.getElementsByTagName('textarea')[0].value = text;
            onTextEnter(text);
        }
    }

    const onTextEnter = (message) => {
        setMsg(message);
        if (message) setDisplay("none");
        else setDisplay("flex");
    }

    const handleDownload = () => {
        if (data) {
            const htmlContent = `<html><body>${data}</body></html>`;
            const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
            saveAs(blob, 'summarized-text.doc');
        }
        else {
            toast.error("No text available to download", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }
    const handleChange = (e) => {
        setData(e.target.value)
    }
    const styles={
        borderBottom:'3px solid blue',
        color:'blue'
    }
    return (
        <div className='summarizer' >
            <div className='heading'>
                <span>Text Summarizer</span>
                <div>-Reduce your reading time-</div>
            </div>
            <div className="container">
                <div className="top-bar">
                    <div className='mode'>Modes :</div>
                    <div className='tabs' onClick={()=>setType(1)} style={type===1?styles:null}>Extractive</div>
                    <div className='tabs' onClick={()=>setType(2)} style={type===2?styles:null}>Abstractive</div>
                    <div className='sumlen'>
                        <div >Summary Length:</div>
                        <input type="range" min="10" max="50" value={len} id='range' onChange={(e) => setLen(e.target.value)} />
                    </div>
                </div>
                <div className="text-field">
                    <div className="left">
                        <textarea name="message" id="input" placeholder='Enter your text here.......' cols="48" rows="18" onChange={(e) => onTextEnter(e.target.value)}></textarea>
                        <div className="paste-button" style={{ display: display }} onClick={pasteText}><FontAwesomeIcon icon={faPaste} />Paste Text</div>
                        <div className='bottom'>
                            <button type='submit' onClick={submit}>Summarize</button>
                        </div>
                    </div>
                    <div className="right">
                        <LoadingIndicator />
                        <textarea name="summary" id="summary" cols="48" rows="18" value={data} onChange={(e) => handleChange(e)}></textarea>
                        <button onClick={copyToClipboard}><FontAwesomeIcon title='Copy to Clipboard' icon={faCopy} /></button>
                        <button className='download' onClick={handleDownload} title='Download as .doc file'><FontAwesomeIcon icon={faRightToBracket} rotation={90} /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TextSummarizer