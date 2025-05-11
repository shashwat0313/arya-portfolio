import MarkdownParser from './markdownUtils/MarkdownParser';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function GenericArticle({ articleId }) {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        console.log("articleId:", articleId); // Log the articleId prop

        // Check if the articleId is a web link
        if (articleId.startsWith("http://") || articleId.startsWith("https://")) {
            console.log("Redirecting to external link:", articleId);
            window.location.replace(articleId); // Use window.location.replace to handle external links
            return;
        }

        // Import all .md files recursively from the markdowns folder
        const markdownFiles = import.meta.glob("../assets/markdowns/**/*.md", { as: "raw" });
        const filePath = Object.keys(markdownFiles).find((path) => path.endsWith(`/${articleId}.md`));

        if (filePath) {
            markdownFiles[filePath]().then((content) => {
                setMarkdownContent(content);
            });
        } else {
            console.error(`Markdown file not found for articleId: ${articleId}`);
        }
    }, [articleId]);

    return (
        <>
            <div className="text-center">
                <MarkdownParser markdown={markdownContent} />
            </div>
        </>
    );
}

GenericArticle.propTypes = {
    articleId: PropTypes.string.isRequired,
};