import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='navbar'>
        <Link to="/">
        <div className="left">
            Automatify
        </div>
        </Link>
        <div className="right">
        <Link to="/">
            <div className="item">
                Home
            </div>
        </Link>
        <Link to="/textsummarizer">
            <div className="item">
                Text-Summarizer
            </div>
        </Link>
        {/* <Link to="/speechrecognition">
            <div className="item">
            Speech-Recognition
            </div>
        </Link> */}
        <Link to="/textextractor">
            <div className="item">
                Text-Extractor
            </div>
        </Link>
        <Link to="/language-translator">
            <div className="item">
            Language-Translator
            </div>
        </Link>
        </div>
    </div>
  )
}

export default Navbar