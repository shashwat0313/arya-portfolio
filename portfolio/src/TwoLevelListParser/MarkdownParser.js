export default function parseMarkdown(mdText) {
    const lines = mdText.split("\n").filter(line => line.trim() !== "");
    const rawData = [];
    let currentL1 = null;

    lines.forEach(line => {
        console.log("line: " + line);
        
        if (line.startsWith("# ")) {
            if (currentL1) rawData.push(currentL1);
            let title = line.substring(2).trim();
            const l2Type = title.toLowerCase().includes("ol") ? "ol" : "ul";
            title = title.replace(/\s+(ol|ul)$/i, "").trim(); // Remove trailing "ol" or "ul"
            currentL1 = { titleLevel1: title, l2Nodes: [], l2Type, l1ItemBoldP: null };
        } else if (line.startsWith("-- ")) {
            const boldText = line.substring(3).trim(); // Ensure the text is trimmed
            if (currentL1) {
                console.log("saving l1ItemBoldP: " + boldText);
                currentL1.l1ItemBoldP = boldText; // Save the trimmed bold text in l1ItemBoldP
            }
        } else if (line.startsWith("## ")) {
            let [titlePart, articleIdPart] = line.substring(3).split(">").map(part => part.trim());
            if (articleIdPart.startsWith("http://") || articleIdPart.startsWith("https://")) {
                articleIdPart = encodeURIComponent(articleIdPart); // Encode the link
            }
            if (currentL1) {
                currentL1.l2Nodes.push({ title: titlePart, articleId: articleIdPart });
            }
        }
    });

    if (currentL1) rawData.push(currentL1);

    // Debugging: Log the final rawData to ensure correctness
    console.log("Final rawData:", JSON.stringify(rawData, null, 2));

    return rawData;
}
