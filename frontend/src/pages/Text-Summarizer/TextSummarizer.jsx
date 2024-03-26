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
    const [len, setLen] = useState(30)
    const [display, setDisplay] = useState("flex")

    const submit = () => {
        if(!msg){
            return toast.error("PLEASE Enter a Text First!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 1500,
            });
        }
        setData("")
        trackPromise(
        axios.post('http://127.0.0.1:5000/api', {
            msg,
            len
        }))
            .then((res)=>{
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
        else{
            toast.error("No text available to download", {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }
    const handleChange=(e)=>{
        setData(e.target.value)
    }
    return (
        <div className='summarizer' >
            <div className='heading'>
                <span>Text Summarizer</span>
                <div>-Reduce your reading time-</div>
            </div>
            <div className="container">
                <div className="left">
                    <h1>Input Text</h1>
                    <form action="POST">
                        <textarea name="message" id="input" placeholder='Enter your text here.......' cols="49" rows="21" onChange={(e) => onTextEnter(e.target.value)}></textarea>
                    </form>
                    <div className="paste-button" style={{ display: display }} onClick={pasteText}><FontAwesomeIcon icon={faPaste} />Paste Text</div>
                    <div className='bottom'>
                        <button type='submit' onClick={submit}>Summarize</button>
                        <div className='sumlen'>
                            <input type="range" min="10" max="100" value={len} id='range' onChange={(e) => setLen(e.target.value)} />
                            <div >Summary Length</div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <h1>Summarized Text</h1>
                    <LoadingIndicator/>
                    <textarea name="summary" id="summary" cols="49" rows="21" value={data} onChange={(e)=>handleChange(e)}></textarea>
                    <button onClick={copyToClipboard}><FontAwesomeIcon title='Copy to Clipboard' icon={faCopy} /></button>
                    <button className='download' onClick={handleDownload} title='Download as .doc file'><FontAwesomeIcon icon={faRightToBracket} rotation={90} /></button>
                </div>
            </div>
        </div>
    )
}

export default TextSummarizer