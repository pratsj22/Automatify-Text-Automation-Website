import React, { useState, useEffect } from 'react'
import './LanguageTranslator.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaste, faCopy } from '@fortawesome/free-regular-svg-icons'
import { toast } from 'react-toastify';
import axios from 'axios'
// import { trackPromise } from 'react-promise-tracker';
import LoadingIndicator from '../animations/LoadingIndicator'
import Select from 'react-select';

const LanguageTranslator = () => {
    const [data, setData] = useState("")
    const [display, setDisplay] = useState("flex")
    const [text, setText] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('English');
    const [inputLanguage, setInputLanguage] = useState('');
    const [inputLanguageOptions, setInputLanguageOptions] = useState([]);
    const [targetLanguageOptions, setTargetLanguageOptions] = useState([]);

    useEffect(() => {
        fetchLanguages();
    }, []);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_URL}/detect-language`, { text })
        .then((res)=> setInputLanguage(res.data['detected_language']))
        .catch((error)=>console.log(error))
    }, [text])

    useEffect(() => {
        if(!text) setData("")
        if(inputLanguage){
            axios.post(`${process.env.REACT_APP_API_URL}/translate`, { text,inputLanguage,targetLanguage })
            .then((res)=> setData(res.data['translated_text']))
            .catch((error)=>console.log(error))
        }
    }, [targetLanguage,text,inputLanguage])
    
    const fetchLanguages = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/languages`);
            setInputLanguageOptions(response.data.languages.map(lang => ({ value: lang.code, label: lang.name })));
            setTargetLanguageOptions(response.data.languages.map(lang => ({ value: lang.code, label: lang.name })));
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };
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
        setText(message);
        if (message) setDisplay("none");
        else setDisplay("flex");
    }
    return (
        <div className='language-translator'>
            <div className='heading'>
                <span>Language Translator</span>
                <div>-Breaking Language Barriers-</div>
            </div>
            <div className="container">
                <div className="left">
                    <h1>Input Text</h1>
                    <Select
                        className='select'
                        value={{ value: inputLanguage, label: inputLanguage }}
                        options={inputLanguageOptions}
                        onChange={(selectedOption) => setInputLanguage(selectedOption.label)}
                    />
                    <form action="POST">
                        <textarea name="message" value={text} id="input" placeholder='Enter your text here.......' cols="40" rows="15" onChange={(e) => onTextEnter(e.target.value)}></textarea>
                    </form>
                    <div className="paste-button" style={{ display: display }} onClick={pasteText}><FontAwesomeIcon icon={faPaste} />Paste Text</div>
                </div>
                <div className="right">
                    <h1>Translated Text</h1>
                    <LoadingIndicator />
                    <Select
                        value={{ value: targetLanguage, label: targetLanguage }}
                        className='select'
                        options={targetLanguageOptions}
                        onChange={(selectedOption) => setTargetLanguage(selectedOption.label)}
                    />
                    <textarea readOnly name="summary" id="summary" cols="40" rows="15" value={data}></textarea>
                    <button style={{ display: display === 'flex' ? 'none' : 'block' }} onClick={copyToClipboard}><FontAwesomeIcon title='Copy to Clipboard' icon={faCopy} /></button>
                </div>
            </div>
        </div>
    )
}

export default LanguageTranslator