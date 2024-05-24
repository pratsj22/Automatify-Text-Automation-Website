import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile, removeFile, reset } from '../../../store/FilesSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faFolderOpen, faFile } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import useMediaQuery from '../../../hooks/useMedia';

const DragOrDrop = () => {
    const [files, setFiles] = useState(null);
    const [msg, setMsg] = useState(null);
    const [display,setDisplay]=useState('flex');
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const inputRef = useRef();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:435px)")
    const select = useSelector(state => state.images);
    useEffect(()=>{
        if(select[0] && isMobile)setDisplay('none');
    })
    useEffect(() => {
        if (!files) {
            return
        }
        setMsg("Uploading...")
        setProgress(prev => {
            return { ...prev, started: true }
        })
        axios.post(`${process.env.REACT_APP_API_URL}/file`, files, {
            onUploadProgress: (progress) => {
                setProgress(prev => {
                    return { ...prev, pc: progress.progress * 100 }
                })
            }
        })
            .then(res => {
                setMsg("Upload Successful")
            }
            )
            .catch(error => {
                console.log(error);
                setMsg("Upload Failed")
            }
            )
        
    }, [files])
    const handleDragover = (e) => {
        e.preventDefault();
    }
    const handleDrop = (e) => {
        e.preventDefault();
        setFiles(e.dataTransfer.files)
        Array.from(e.dataTransfer.files).map((item, index) => (
            dispatch(uploadFile({
                name: item.name,
                imageURL: URL.createObjectURL(item)
            }))
        )
    )
    
    }
const handleUpload = (e) => {
    setFiles(e.target.files);
        Array.from(e.target.files).map((item, index) => (
            dispatch(uploadFile({
                name: item.name,
                imageURL: URL.createObjectURL(item)
            }))
        )
        )
        

    }
    const clearAll=()=>{
        if(isMobile)setDisplay('flex')
        dispatch(reset());
    }
    const onDelete = (item) => {
        dispatch(removeFile(item))
    }
    return (
        <div className="upload">
            <div className="file-upload-area" onDragOver={handleDragover} onDrop={handleDrop} style={{display:display}}>
                <FontAwesomeIcon icon={faFolderOpen} size='xl' />
                <h3>Drag & drop files</h3>
                <span>Or</span>
                <input
                    type="file"
                    multiple
                    hidden
                    onChange={(e) => handleUpload(e)}
                    ref={inputRef}
                />
                <button className='select-files' onClick={() => inputRef.current.click()}><FontAwesomeIcon icon={faFile} /> Choose a file</button>
            </div>
            <div className="file-show-area" style={{ display: select[0] ? 'flex' : 'none' }}>
                {select[0] &&
                    select.map((item, index) =>
                        <div className='after-upload' key={index}>
                            <img src={item.imageURL} alt="" />
                            <div className="name">
                                <div className='file-name'>{item.name}</div>
                                {progress.started && <progress max={100} value={progress.pc}></progress>}
                                {msg && <span>{msg}</span>}
                            </div>
                            <button onClick={() => onDelete(item)} title='Cancel'><FontAwesomeIcon icon={faTrashCan} /></button>
                        </div>
                    )
                }
                {select[0] &&
                    <button className='clear-all' onClick={() => clearAll()}>Clear All</button>
                }
            </div>
        </div>

    )
}

export default DragOrDrop