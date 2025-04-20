import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";
import BoldHeading from "../text/BoldHeading";

export default function EditWorkflow() {
    const [health, setHealth] = useState({ status: "Checking...", ok: false });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenExpiry, setTokenExpiry] = useState(null);
    const [markdownFiles, setMarkdownFiles] = useState([]);
    const [filesStatus, setFilesStatus] = useState(undefined);

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

    return (
        <div className="lg-max-w mx-3">
            {/* <h1>Edit Workflow</h1> */}
            <BoldHeading text="Edit Workflow" />
            <br></br>
            <ol className="custom-ol-list text-2xl">
                <li>
                    Backend Health: {health.status}
                    {health.ok && <span style={{ color: "green" }}> ✔</span>}
                </li>
                <li>
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
                                <button type="submit">Submit</button>
                            </form>
                        </>
                    )}
                </li>
                {isLoggedIn && (
                    <li>
                        Markdown Files:
                        {filesStatus === undefined ? (
                            "Fetching files..."
                        ) : filesStatus === false ? (
                            "Failed to fetch files."
                        ) : (
                            <>
                                <ul>
                                    {markdownFiles.map(file => (
                                        <li key={file}>{file}</li>
                                    ))}
                                </ul>
                                <span style={{ color: "green" }}> ✔</span>
                            </>
                        )}
                    </li>
                )}
            </ol>

        </div>
    );
}