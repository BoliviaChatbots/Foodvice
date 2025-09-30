import React from 'react'
import './TitleSlide.css'

const TitleSlide = ({ text = "Título del Slide" }) => {
    return (
        <div className="container title-slide">
            <h1>{text}</h1>
        </div>
    )
}

export default TitleSlide