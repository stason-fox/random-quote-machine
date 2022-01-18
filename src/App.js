import React, { useState, useEffect } from "react";
import "./App.css";
import { FaTwitterSquare } from "react-icons/fa";

const App = () => {
    const [quotes, setQuotes] = useState([]);
    const [index, setIndex] = useState(0);
    const [color, setColor] = useState("#045fd0");

    useEffect(() => {
        fetch(
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        )
            .then((res) => res.json())
            .then((data) => {
                setQuotes(data.quotes);
            });
    }, []);

    const handleClick = () => {
        const randomQuote = Math.floor(Math.random() * quotes.length);
        setIndex(randomQuote);
        const background = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
        setColor(background);
    };

    return quotes.length > 0 ? (
        <div
            className="App"
            style={{
                backgroundColor: color,
            }}
        >
            <div className="quote-box">
                <h1>"{quotes[index].quote}"</h1>
                <h2>- {quotes[index].author}</h2>
                <button
                    onClick={handleClick}
                    style={{
                        backgroundColor: color,
                    }}
                >
                    New quote
                </button>
                <a
                    href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=encodeURIComponent(${quotes[index].quote}-${quotes[index].author})`}
                    target="_blank"
                    rel="noreferrer"
                >
                    <FaTwitterSquare />
                </a>
            </div>
        </div>
    ) : (
        <div className="loading">
            <h2>Loading...</h2>
        </div>
    );
};

export default App;
