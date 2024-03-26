import React from "react"
import { Link } from 'react-router-dom'

const Title=({title,content,link,image,btn_name,classes})=>{
    return(
        <div className={`section ${classes} main`} >
        <div className="left">
          <div className="title">
            {title}
          </div>
          <div className="content">
            {content}
          </div>
          <div className="button">
            <Link to={link}>
              <button>{btn_name}</button>
            </Link>
          </div>
        </div>
        <div className="right">
          <img src={image} alt="" />
        </div>
      </div>
    )
}
export default Title