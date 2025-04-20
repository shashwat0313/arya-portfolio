import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";
import BoldHeading from "../text/BoldHeading";

export default function EditWorkflow() {
    const [health, setHealth] = useState({ status: "Checking...", ok: false });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenExpiry, setTokenExpiry] = useState(null);
    const [markdownFiles, setMarkdownFiles] = useState([]);
    const [filesStatus, setFilesStatus] = useState(undefined);
    const [selectedFilePath, setSelectedFilePath] = useState("");
    const [fileContent, setFileContent] = useState("");
    const textAreaRef = useRef(null); // Reference for the text area

    useEffect(() => {
        // Check backend health
        axios.get(`${BACKEND_BASE_URL}/`)
            .then(response => {
                if (response.status === 200) {
                    setHealth({ status: "Okay", ok: true });
                } else {
                    setHealth({ status: "Bad", ok: false });
                }
            })
            .catch(() => {
                setHealth({ status: "Bad", ok: false });
            });

        // Check login status
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const expiryTime = new Date(decodedToken.exp * 1000);
            const timeRemaining = Math.max(0, Math.floor((expiryTime - new Date()) / 1000));
            if (timeRemaining > 0) {
                setIsLoggedIn(true);
                const hours = Math.floor(timeRemaining / 3600);
                const minutes = Math.floor((timeRemaining % 3600) / 60);
                setTokenExpiry({ hours, minutes });
            } else {
                localStorage.removeItem("token");
            }
        }

        // Fetch markdown files
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
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token");
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
    }, [isLoggedIn]);

    useEffect(() => {
        if (fileContent && textAreaRef.current) {
            textAreaRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the text area
        }
    }, [fileContent]);

    function loginSubmitHandler(e) {
        e.preventDefault();
        const passcode = e.target.passcode.value;

        axios.post(`${BACKEND_BASE_URL}/auth/login`, { passcode })
            .then(response => {
                const data = response.data;
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
                const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
                const expiryTime = new Date(decodedToken.exp * 1000);
                const timeRemaining = Math.max(0, Math.floor((expiryTime - new Date()) / 1000));
                const hours = Math.floor(timeRemaining / 3600);
                const minutes = Math.floor((timeRemaining % 3600) / 60);
                setTokenExpiry({ hours, minutes });
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert("Unauthorized: Incorrect passcode. Please try again.");
                } else {
                    console.error("Error during login:", error);
                }
            });
    }

    function logoutHandler() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    function fetchFileContent() {
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

    return (
        <div className="lg-max-w mx-3">
            <BoldHeading text="Edit Workflow" />
            <br></br>
            <ol className="custom-ol-list text-2xl">
                <li className="text-xl">
                    Backend Health: {health.status}
                    {health.ok && <span style={{ color: "green" }}> ✔</span>}
                </li>
                <li className="text-xl">
                    {isLoggedIn ? (
                        <>
                            You are already authenticated. Time remaining: {tokenExpiry.hours} hours and {tokenExpiry.minutes} minutes.
                            <span style={{ color: "green" }}> ✔</span>
                            <button 
                                onClick={logoutHandler} 
                                style={{ 
                                    marginLeft: "10px", 
                                    border: "1px solid #ccc", 
                                    padding: "5px 10px", 
                                    borderRadius: "5px", 
                                    backgroundColor: "#f5f5f5", 
                                    cursor: "pointer" 
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            You are not logged in. Please enter passcode:
                            <form onSubmit={loginSubmitHandler}>
                                <input
                                    type="password"
                                    id="passcode"
                                    name="passcode"
                                    placeholder="Enter passcode"
                                    required
                                />
                                <button 
                                    type="submit" 
                                    style={{ 
                                        marginLeft: "10px", 
                                        border: "1px solid #ccc", 
                                        padding: "5px 10px", 
                                        borderRadius: "5px", 
                                        backgroundColor: "#f5f5f5", 
                                        cursor: "pointer" 
                                    }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                                    onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                                >
                                    Submit
                                </button>
                            </form>
                        </>
                    )}
                </li>
                {isLoggedIn && (
                    <li className="text-xl">
                        Markdown Files:
                        {filesStatus === undefined ? (
                            "Fetching files..."
                        ) : filesStatus === false ? (
                            "Failed to fetch files."
                        ) : (
                            <>
                                <span style={{ color: "green" }}> ✔</span>
                                <ol>
                                    {markdownFiles.map(file => (
                                        <li key={file} onClick={() => setSelectedFilePath(file)} style={{ cursor: "pointer", textDecoration: "underline" }}>
                                            {file}
                                        </li>
                                    ))}
                                </ol>
                            </>
                        )}
                    </li>
                )}
                {isLoggedIn && (
                    <li className="text-xl">
                        <form onSubmit={(e) => { e.preventDefault(); fetchFileContent(); }} style={{ marginTop: "15px" }}>
                            <label htmlFor="filepath" style={{ display: "block", marginBottom: "5px" }}>File Path:</label>
                            <input
                                type="text"
                                id="filepath"
                                value={selectedFilePath}
                                onChange={(e) => setSelectedFilePath(e.target.value)}
                                placeholder="Enter file path by selecting a file from the list"
                                style={{ marginBottom: "5px", width: "100%" }}
                            />
                            <button 
                                type="submit" 
                                style={{ 
                                    marginTop: "5px", 
                                    marginBottom: "0", 
                                    border: "1px solid #ccc", 
                                    padding: "5px 10px", 
                                    borderRadius: "5px", 
                                    backgroundColor: "#f5f5f5", 
                                    cursor: "pointer" 
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                                onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                            >
                                See file content
                            </button>
                        </form>
                        {fileContent && (
                            <textarea
                                ref={textAreaRef} // Attach the reference to the text area
                                value={fileContent}
                                readOnly // Make the text area non-editable
                                placeholder="File content will appear here"
                                style={{ width: "100%", height: "200px", marginTop: "10px" }}
                            />
                        )}
                    </li>
                )}
            </ol>
        </div>
    );
}