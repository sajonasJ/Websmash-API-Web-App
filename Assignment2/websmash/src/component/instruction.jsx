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
    // Array of slides with image source and captions
    const slides = [
        { src: one, caption: 'Title: WebSmash' },
        { src: two, caption: 'Function and Purpose' },
        { src: three, caption: `API's` },
        { src: four, caption: 'How to Use' },
        { src: five, caption: 'You can Search' },
        { src: six, caption: 'API ' },
        { src: seven, caption: 'Contact Us' },
    ];

    // State variable to keep track of the current slide index
    const [slideIndex, setSlideIndex] = useState(0);

    useEffect(() => {
        // Set up an interval to change slides automatically
        const timer = setInterval(() => {
            setSlideIndex((prevSlideIndex) => (prevSlideIndex + 1) % slides.length);
        }, 5000); // Change image every 5 seconds (5000 milliseconds)

        // Clear the timer on component unmount to avoid memory leaks
        return () => clearInterval(timer);
    }, [slides.length]);

    // Function to handle moving to the previous or next slide
    const plusSlides = (n) => {
        // Calculate the new slide index based on the current slide and the given offset
        setSlideIndex(((slideIndex + n) + slides.length) % slides.length);
    };

    // Function to handle moving to a specific slide
    const currentSlide = (n) => {
        // Set the slide index to the given value
        setSlideIndex(n);
    };

    return (
        <div className="instruction">
            <div className="slideshow-container">
                {/* Loop through slides and render each slide */}
                {slides.map((slide, index) => (
                    <div className={`mySlides fade ${index === slideIndex ? 'show' : ''}`} key={index}>
                        {/* Display slide number */}
                        <div className="numbertext">{`${index + 1} / ${slides.length}`}</div>
                        {/* Display slide image */}
                        <img src={slide.src} style={{ width: '100%' }} alt={slide.caption} />
                        {/* Display slide caption */}
                        <div className="text">{slide.caption}</div>
                    </div>
                ))}
                {/* Button to move to previous slide */}
                <button className="prev" onClick={() => plusSlides(-1)}>&#10094;</button>
                {/* Button to move to next slide */}
                <button className="next" onClick={() => plusSlides(1)}>&#10095;</button>
            </div>
            <br />
            <div style={{ textAlign: 'center' }}>
                {/* Loop through slides and render dot indicators */}
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${index === slideIndex ? 'active' : ''}`}
                        onClick={() => currentSlide(index)}
                    ></span>
                ))}
            </div>
        </div>
    );
}

export default Instruction;
