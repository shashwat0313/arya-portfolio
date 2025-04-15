import MarkdownParser from './markdownUtils/MarkdownParser';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function GenericArticle({ articleId }) {
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        console.log("articleId:", articleId); // Log the articleId prop

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