import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";

async function getFilesList({token, setMarkdownFiles, setFilesStatus}) {
    axios.get(`${BACKEND_BASE_URL}/github-api/files-list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            const allFiles = response.data.filesList;

            // Filter files under the portfolio/src/assets/markdowns/ folder
            const markdownFiles = allFiles.filter(file => 
                file.endsWith(".md") && file.startsWith("portfolio/src/assets/markdowns/")
            );

            // Place List.md at the first position if it exists
            const listMdIndex = markdownFiles.findIndex(file => file.endsWith("List.md"));
            if (listMdIndex !== -1) {
                const [listMdFile] = markdownFiles.splice(listMdIndex, 1);
                markdownFiles.unshift(listMdFile);
            }

            setMarkdownFiles(markdownFiles);
            setFilesStatus(true);
        })
        .catch(() => {
            setFilesStatus(false);
        });
}

async function fetchFileContent({setFileContent, selectedFilePath}) {
    const token = localStorage.getItem("token");
    axios.get(`${BACKEND_BASE_URL}/github-api/file-content`, {
        params: {
            filepath: selectedFilePath,
            branch: "main"
        },
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            setFileContent(response.data.content);
        })
        .catch(error => {
            console.error("Error fetching file content:", error);
            alert("Failed to fetch file content.");
        });
}

export {getFilesList, fetchFileContent};