import React, { useEffect } from 'react'
import './Home.scss'
import Title from './components/Title'
import axios from 'axios'
const Home = () => {
  useEffect(()=>{
    const loadServer=async()=>{
      await axios.get(process.env.REACT_APP_API_URL);
    }
    loadServer();
  },[])
  return (
    <div className="home">
      <div className='main' style={{ backgroundImage: 'url(/back.jpg)' }}>
        <h1>Automatify</h1>
        <div className="overlay"></div>
      </div>
      <h1>
        -- What We Offer --
      </h1>
      <Title image="/text1.png" title="Text-Summarizer" content="In the fast-paced digital age, information overload can be overwhelming. Long articles, research papers, and news reports can consume valuable time and attention. That's where our Text Summarizer comes to your rescue." link="/textsummarizer" btn_name="Summarize" classes="summarize" />
      <Title image="/extractor.png" title="Text-Extractor" content="Extracting valuable insights from unstructured text data is made effortless with Automatify's Text Extractor feature. Say goodbye to manual data entry and tedious information retrieval tasks, and let Automatify streamline your workflow." link="/textextractor" btn_name="Extract" classes="extract" />
      <Title image="/translate.png" title="Language-Translator" content="Break down language barriers and unlock global communication opportunities with Automatify's Language Translator. Experience the power of instant translation with Automatify." link="/language-translator" btn_name="Translate" classes="translate" />
    </div>
  )
}

export default Home