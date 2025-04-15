import MarkdownParser from "./MarkdownParser";
import { useEffect, useState } from 'react';

export default function TestGenericArticle() {

    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        const markdownFiles = import.meta.glob("../../assets/markdowns/*.md", { as: "raw" });
        markdownFiles["../../assets/markdowns/TestArticle1.md"]().then((content) => {
            setMarkdownContent(content);
        });
        console.log("Markdown content loaded:", markdownContent);
        
    } )

    return (
        <>
        <div className="text-center">
            <MarkdownParser markdown={markdownContent} />
        </div>
        </>
    );
}