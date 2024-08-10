import { useState, useEffect } from "react";
import "./ContainerFeed.css";

const jokeUrl = "https://icanhazdadjoke.com";
const jokeParams = { headers: { Accept: "application/json" } };
const quoteUrl = "https://dummyjson.com/quotes/random";
//  "https://type.fit/api/quotes";

export default function ContainerFeed() {
    const [content, setContent] = useState({ isLoading: true, fetchJokes: true, fetchQuotes: true });
    useEffect(function () {
        fetchData();
    }, []);

    const fetchData = async () => {
        setContent(data => ({ ...data, isLoading: true }));

        const type = getType();
        let baseUrl = null;
        let params = {};

        if (type === "joke") {
            baseUrl = jokeUrl;
            params = jokeParams
        } else if (type === "quote") {
            baseUrl = quoteUrl;
        }

        const response = await fetch(baseUrl, params);
        const data = await response.json();

        setContent(content => ({ ...content, joke: data.joke, quote: data.quote, author: data.author, isLoading: false, type: type }));
    }

    const getType = () => {
        let type = null;
        console.log("Content", content);
        if (content.fetchJokes && content.fetchQuotes) {
            type = Math.random() < 0.5 ? "joke" : "quote";
            console.log(type)
        } else if (content.fetchJokes) {
            type = "joke";
        } else {
            type = "quote";
        }
        return type;
    }
    return (
        <main className="ContainerFeed">
            <h3 className="title">
                {content.isLoading ? "Loading..." :
                    content.type === "joke" ? "Don't Laugh Challenge" : `- ${content.author}`}
            </h3>
            <div className="content">
                {content.isLoading ? "Loading..." :
                    content.type === "joke" ? content.joke : content.quote}
            </div>
            <button id="getAnotherBtn" onClick={fetchData}>Get Another</button>
        </main>
    )
}