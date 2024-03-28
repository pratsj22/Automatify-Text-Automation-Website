import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-regular-svg-icons'
import { faRightToBracket, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { useSelector } from 'react-redux'

const Result = () => {
  const [data, setData] = useState({})
  const select = useSelector(state => state.images)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/file`)
      .then(res => {
        setData(res.data)
      })
  }, [])

  const copyToClipboard = (index) => {
    if (data[index] === "") {
      toast.error("Nothing to copy", {
        position: toast.POSITION.TOP_CENTER
      })
    }
    else {
      navigator.clipboard.writeText(data[index]);
      toast.success("Copied to Clipboard")
    }
  }
  const handleDownload = (index) => {
    if (data[index]) {
      const htmlContent = `<html><body>${data[index]}</body></html>`;
      const blob = new Blob([htmlContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, 'extracted-text.doc');
    }
    else {
      toast.error("No text available to download", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }
  const startOver = () => {
    window.location.reload()
  }
  return (
    <div className='result'>
      <div className="result-box">
        {select?.map((item, index) =>
          <div className="result-area" key={index}>
            <div className="left">
              <img src={item.imageURL} alt="" />
            </div>
            <div className="right">
              <textarea name="result" cols="30" value={data[item.id]} rows="10"></textarea>
              <button onClick={() => copyToClipboard(item.id)}><FontAwesomeIcon title='Copy to Clipboard' icon={faCopy} /></button>
              <button className='download' onClick={() => handleDownload(item.id)} title='Download as Word document'><FontAwesomeIcon icon={faRightToBracket} rotation={90} /></button>
            </div>
          </div>
        )}
        <button className='start-over' onClick={startOver}><FontAwesomeIcon icon={faArrowRotateRight} /> Start Over</button>
      </div>
    </div>
  )
}

export default Result