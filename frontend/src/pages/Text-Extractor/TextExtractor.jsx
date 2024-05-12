import React, { useState } from 'react'
import './TextExtractor.scss'
import DragOrDrop from './components/DragOrDrop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import Result from './components/Result';
import { useSelector } from 'react-redux';

const TextExtractor = () => {
  const [showResult, setShowResult] = useState(false)
  const [img, setImg] = useState(null);
  const state =useSelector((state)=> state.images)
  const convert = () => {
    if(state[0]){
      setShowResult(true);
    }
    else{
      toast.error("PLEASE Upload Something!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
    });
    }
  }
  return (
      <div className='text-extractor'>
        <div className="container">
          {!showResult && <DragOrDrop setImg={setImg} />}
          {showResult && <Result img={img} />}
          {!showResult && <button className='convert' onClick={convert}>Extract Text <FontAwesomeIcon icon={faArrowRight} /></button>}
        </div>
      </div>
  )
}

export default TextExtractor