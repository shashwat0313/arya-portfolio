import Level1List from "./Level1List";
import TwoLevelListParser from "../TwoLevelListParser/Parser";
import parseMarkdown from "../TwoLevelListParser/MarkdownParser";
import { useEffect, useState } from "react";

export default function ListViewer() {
    const [rawData, setRawData] = useState(null);

    useEffect(() => {
        const markdownFiles = import.meta.glob("../assets/markdowns/List.md", { as: "raw" });
        const filePath = Object.keys(markdownFiles).find((path) => path.endsWith("List.md"));

        if (filePath) {
            markdownFiles[filePath]().then((content) => {
                const parsedData = parseMarkdown(content); // Parse the markdown content
                setRawData(parsedData); // Set the parsed data
            });
        } else {
            console.error("List.md file not found.");
        }
    }, []);

    if (!rawData) {
        return <div>Loading...</div>; // Show a loading state while data is being fetched
    }

    const rootNode = TwoLevelListParser(rawData);

    return <Level1List rootNode={rootNode} />;
}