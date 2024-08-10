import { useState, useEffect } from "react";
import "./ContainerFeed.css";

export default function ContainerFeed() {
    const baseUrl = "https://icanhazdadjoke.com";
    const params = { headers: { Accept: "application/json" } };
    const [content, setContent] = useState({});
    const fetchData = async () => {
        const response = await fetch(baseUrl, params);
        const data = await response.json();
        setContent(data);
    }
    return (
        <main className="ContainerFeed">
            <h3 className="title">Don't Laugh Challenge</h3>
            <div className="content">{content.joke}</div>
            <button id="getAnotherBtn" onClick={fetchData}>Get Another Joke</button>
        </main>
    )
}