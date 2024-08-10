import { useState, useEffect } from "react";
import "./ContainerFeed.css";

const baseUrl = "https://icanhazdadjoke.com";
const params = { headers: { Accept: "application/json" } };

export default function ContainerFeed() {
    const [content, setContent] = useState({ isLoading: true });
    useEffect(function () {
        fetchData();
    }, []);

    const fetchData = async () => {
        setContent(data => ({ ...data, isLoading: true }));
        const response = await fetch(baseUrl, params);
        const data = await response.json();
        setContent({ ...data, isLoading: false });
    }
    return (
        <main className="ContainerFeed">
            <h3 className="title">Don't Laugh Challenge</h3>
            <div className="content">{content.isLoading ? "Loading..." : content.joke}</div>
            <button id="getAnotherBtn" onClick={fetchData}>Get Another Joke</button>
        </main>
    )
}