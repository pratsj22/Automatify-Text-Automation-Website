import React, { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';

const Navbar = () => {
    const isDesktop = useMediaQuery('(min-width:660px)');
    const [display, setDisplay] = useState('none');
    const [disp, setDisp] = useState('flex');
    const [angle, setAngle] = useState('0deg');
    const [moveX, setMoveX] = useState('0px');
    const [moveY, setMoveY] = useState('0px');
    const changeStyle = () => {
        setDisp(disp === 'flex' ? 'none' : 'flex');
        setAngle(angle === '0deg' ? '45deg' : '0deg');
        setMoveX(moveX === '0px' ? '6px' : '0px');
        setMoveY(moveY === '0px' ? '6px' : '0px');
        setDisplay(display === 'flex' ? 'none' : 'flex');
    }
    return (
        <div className='navbar'>
            <div className="left">
                <Link to="/">
                    Automatify
                </Link>
            </div>
            <div className="right" style={{ display: isDesktop ? 'flex' : display }} onClick={() => isDesktop ? null : changeStyle()}>
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
            <div className="menu" onClick={changeStyle} onBlurCapture={changeStyle}>
                <div className="lines" style={{ transform: `rotate(${angle}) translateX(${moveX}) translateY(${moveY})` }}></div>
                <div className="lines" style={{ transform: `rotate(-${angle}) translateX(${moveX}) translate(-${moveY})` }}></div>
                <div className="lines" style={{ display: disp }}></div>
            </div>
        </div>
    )
}

export default Navbar