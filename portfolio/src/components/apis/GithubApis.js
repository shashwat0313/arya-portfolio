import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";

async function getFilesList({token, setMarkdownFiles, setFilesStatus}){
    axios.get(`${BACKEND_BASE_URL}/github-api/files-list`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            setMarkdownFiles(response.data.filesList.filter(file => file.endsWith(".md")));
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