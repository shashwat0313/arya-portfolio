import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";
import BoldHeading from "../text/BoldHeading";
import Button from "./Button";
import Step2Login from "./Step2Login";
import FileList from "./FileList";
import FileViewer from "./FileViewer";
import EditFile from "./EditFile";
import CreateFile from "./CreateFile";
import {getFilesList, fetchFileContent} from "../apis/GithubApis"
import {loginSubmitHandlerInternal, logoutHandler, checkAuthStatus} from "./auth/AuthHandlers"

export default function EditWorkflow() {
    const [health, setHealth] = useState({ status: "Checking...", ok: false });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenExpiry, setTokenExpiry] = useState(null);
    const [markdownFiles, setMarkdownFiles] = useState([]);
    const [filesStatus, setFilesStatus] = useState(undefined);
    const [selectedFilePath, setSelectedFilePath] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [actionCompleted, setActionCompleted] = useState(false); // State to track if an action is completed
    const [editingFilePath, setEditingFilePath] = useState(""); // New state for editing file
    const [creatingFilePath, setCreatingFilePath] = useState(""); // New state for creating file
    const [activeAction, setActiveAction] = useState(""); // Track the currently active action
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
        
        checkAuthStatus({token, setIsLoggedIn, setTokenExpiry})

        // Fetch markdown files
        if(isLoggedIn){
            getFilesList({token, setMarkdownFiles, setFilesStatus})
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token");
            getFilesList({token, setMarkdownFiles, setFilesStatus})
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (fileContent && textAreaRef.current) {
            textAreaRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the text area
        }
    }, [fileContent]);

    useEffect(() => {
        if ((editingFilePath || creatingFilePath) && textAreaRef.current) {
            textAreaRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to the EditFile or CreateFile component
        }
    }, [editingFilePath, creatingFilePath]);

    function loginSubmitHandler(e) {
        e.preventDefault();
        const passcode = e.target.passcode.value;

        loginSubmitHandlerInternal(e, {setIsLoggedIn, setTokenExpiry, passcode})
    }

    const handleActionSelection = (action) => {
        if (activeAction) {
            alert(`You have already selected the "${activeAction}" option. Please reload the page to select a different option.`);
            return;
        }

        setActiveAction(action); // Set the active action

        setSelectedFilePath(""); // Clear selected file path
        setFileContent(""); // Clear file content
        setActionCompleted(false); // Reset action completed state
        setEditingFilePath(""); // Reset editing file path
        setCreatingFilePath(""); // Reset creating file path

        if (action === "create") {
            setCreatingFilePath("new");
        } else if (action === "edit") {
            if (selectedFilePath) {
                setEditingFilePath(selectedFilePath);
            } else {
                alert("Please select a file first.");
            }
        } else if (action === "view") {
            if (selectedFilePath) {
                fetchFileContent({ selectedFilePath, setFileContent })
                    .then(() => setActionCompleted(true))
                    .catch(() => alert("Failed to fetch file content."));
            } else {
                alert("Please select a file first.");
            }
        }
    };

    return (
        <div className="lg-max-w mx-3">
            <BoldHeading text="Edit Workflow" />
            <br></br>
            <ol className="custom-ol-list text-2xl">
                <li className="text-xl">
                    Backend Health: {health.status}
                    {health.ok && <span style={{ color: "green" }}> ✔</span>}
                </li>
                {health.ok &&

                <li className="text-xl">
                    <Step2Login isLoggedIn={isLoggedIn}
                                loginSubmitHandler={loginSubmitHandler} 
                                tokenExpiry={tokenExpiry} 
                                logoutHandler={logoutHandler} 
                                health={health}
                    />
                </li>
                }

                {isLoggedIn && (
                    <li className="text-xl">
                        Markdown Files:
                        <ol>
                            {markdownFiles.map(file => (
                                <li key={file} 
                                    onClick={() => setSelectedFilePath(file)} 
                                    style={{ 
                                        cursor: "pointer", 
                                        textDecoration: "underline", 
                                        backgroundColor: selectedFilePath === file ? "#e0f7fa" : "transparent" // Highlight selected file
                                    }}
                                >
                                    {file}
                                </li>
                            ))}
                        </ol>
                    </li>
                )}
            
                {(markdownFiles.length > 0 && isLoggedIn) && (
                    <li className="text-xl">
                        <div>
                            <p>Select an action:</p>
                            <Button text="See File Content" 
                                    buttonClickHandler={() => handleActionSelection("view")} 
                                    disabled={!!activeAction && activeAction !== "view"} // Grey out if another action is active
                            />
                            <Button text="Create New File" 
                                    buttonClickHandler={() => handleActionSelection("create")} 
                                    disabled={!!activeAction && activeAction !== "create"} // Grey out if another action is active
                            />
                            <Button text="Edit Existing File" 
                                    buttonClickHandler={() => handleActionSelection("edit")} 
                                    disabled={!!activeAction && activeAction !== "edit"} // Grey out if another action is active
                            />
                        </div>
                    </li>
                )}

                {(markdownFiles.length > 0 && isLoggedIn && actionCompleted) && ( // Only show this section if an action is completed
                    <li className="text-xl">
                        <FileViewer fetchFileContent={fetchFileContent}
                                    selectedFilePath={selectedFilePath}
                                    setSelectedFilePath={setSelectedFilePath}
                                    fileContent={fileContent}
                                    textAreaRef={textAreaRef}
                                    setFileContent={setFileContent}
                        />
                    </li>
                )}

                {editingFilePath && ( // Render EditFile component when editingFilePath is set
                    <li className="text-xl" ref={textAreaRef}>
                        <EditFile editingFilePath={editingFilePath} />
                    </li>
                )}

                {creatingFilePath === "new" && ( // Render CreateFile component only when creatingFilePath is set
                    <li className="text-xl" ref={textAreaRef}>
                        <CreateFile fileList={markdownFiles} creatingFilePath="" />
                    </li>
                )}
                
            </ol>
        </div>
    );
}