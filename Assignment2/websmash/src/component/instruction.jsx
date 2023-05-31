import React, { useState, useEffect } from 'react';
import '../css/instruction.css';
import one from '../assets/one.png';
import two from '../assets/two.png';
import three from '../assets/three.png';
import four from '../assets/four.png';
import five from '../assets/five.png';
import six from '../assets/six.png';
import seven from '../assets/seven.png';

function Instruction() {
    const slides = [
        { src: one, caption: 'Title: WebSmash' },
        { src: two, caption: 'Function and Purpose' },
        { src: three, caption: `API's` },
        { src: four, caption: 'How to Use' },
        { src: five, caption: 'You can Search' },
        { src: six, caption: 'API ' },
        { src: seven, caption: 'Contact Us' },
    ];
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setSlideIndex((prevSlideIndex) => (prevSlideIndex + 1) % slides.length);
        }, 5000); // Change image every 2 seconds

        // Clear timer on component unmount
        return () => clearInterval(timer);
    }, [slides.length]);

    const plusSlides = (n) => {
        setSlideIndex(((slideIndex + n) + slides.length) % slides.length);
    };

    const currentSlide = (n) => {
        setSlideIndex(n);
    };

    return (
        <div className="instruction">
            <div className="slideshow-container">
                {slides.map((slide, index) => (
                    <div className={`mySlides fade ${index === slideIndex ? 'show' : ''}`} key={index}>
                        <div className="numbertext">{`${index + 1} / ${slides.length}`}</div>
                        <img src={slide.src} style={{ width: '100%' }} alt={slide.caption} />
                        <div className="text">{slide.caption}</div>
                    </div>
                ))}
                <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
                <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                {slides.map((_, index) => (
                    <span key={index} className={`dot ${index === slideIndex ? 'active' : ''}`}
                        onClick={() => currentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default Instruction;
