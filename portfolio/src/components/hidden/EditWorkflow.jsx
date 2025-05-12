import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants";
import BoldHeading from "../text/BoldHeading";
import Button from "./Button";
import Step2Login from "./Step2Login";
import FileViewer from "./FileViewer";
import EditFile from "./EditFile";
import CreateFile from "./CreateFile";
import {getFilesList, fetchFileContent} from "../apis/GithubApis"
import {loginSubmitHandlerInternal, logoutHandler, checkAuthStatus} from "./auth/AuthHandlers"
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from "react-icons/fa"; // Import icons

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
    const [githubActionsStatus, setGithubActionsStatus] = useState({ message: "Fetching...", icon: null }); // New state for GitHub Actions status
    const [lastSuccessfulRun, setLastSuccessfulRun] = useState("Fetching..."); // State to store the last successful run time
    const [isActive, setIsActive] = useState(false);

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

    useEffect(() => {
        // Fetch GitHub Actions status and last successful deployment run time from the backend
        const fetchGithubActionsStatus = async () => {
            const token = localStorage.getItem("token"); // Retrieve token from localStorage
            if (!token) {
                setGithubActionsStatus({ message: "Please log in", icon: <FaExclamationCircle style={{ color: "red" }} /> });
                setLastSuccessfulRun("Please log in");
                return;
            }

            try {
                // Fetch GitHub Actions status
                const actionsStatusResponse = await axios.get(`${BACKEND_BASE_URL}/github-api/actions-status`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include Bearer token in headers
                    },
                });
                const { status, conclusion } = actionsStatusResponse.data;
                setGithubActionsStatus(
                    status === "completed" 
                        ? { message: `Completed (${conclusion})`, icon: <FaCheckCircle style={{ color: "green" }} /> }
                        : { message: `In Progress (${status})`, icon: <FaSpinner style={{ color: "orange" }} /> }
                );

                // Fetch last successful deployment run time
                const lastRunResponse = await axios.get(`${BACKEND_BASE_URL}/github-api/latest-successful-deployment`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include Bearer token in headers
                    },
                });
                if (lastRunResponse.data.time) {
                    setLastSuccessfulRun(new Date(lastRunResponse.data.time).toLocaleString()); // Format the last run time
                } else {
                    setLastSuccessfulRun("No successful deployments found");
                }
            } catch (error) {
                console.error("Error fetching GitHub Actions status or last successful deployment:", error.message);
                setGithubActionsStatus({ message: "Failed to fetch status", icon: <FaExclamationCircle style={{ color: "red" }} /> });
                setLastSuccessfulRun("Failed to fetch");
            }
        };

        fetchGithubActionsStatus();
    }, [isLoggedIn]);

    useEffect(() => {
        // Reset editingFilePath when a new file is selected
        if (activeAction === "edit" && selectedFilePath) {
            setEditingFilePath(selectedFilePath);
        }
        else if(activeAction === "view" && selectedFilePath){
            fetchFileContent({ selectedFilePath, setFileContent })
                    .then(() => setActionCompleted(true))
                    .catch(() => alert("Failed to fetch file content."));
                    setIsActive(true)
        }
    }, [selectedFilePath, activeAction]);


    function loginSubmitHandler(e) {
        e.preventDefault();
        const passcode = e.target.passcode.value;

        loginSubmitHandlerInternal(e, {setIsLoggedIn, setTokenExpiry, passcode})
    }

    const handleActionSelection = (action) => {
        if (activeAction && activeAction !== action) {
            alert(`Warning: You are currently in the "${activeAction}" option. Switching to "${action}" may cause unsaved changes.`);
        }

        setActiveAction(action); // Set the active action
        
        if (action === "create") {
            setCreatingFilePath("new");
            setEditingFilePath(""); // Reset editing file path
            setIsActive(true)
        } else if (action === "edit") {
            if (selectedFilePath) {
                setEditingFilePath(selectedFilePath); // Set the selected file path for editing
                setCreatingFilePath(""); // Reset creating file path
                setIsActive(true)
            } else {
                alert("Please select a file first.");
            }
        } else if (action === "view") {
            console.log("selectedfilepath:" + selectedFilePath);
            
            if (selectedFilePath) {
                fetchFileContent({ selectedFilePath, setFileContent })
                    .then(() => setActionCompleted(true))
                    .catch(() => alert("Failed to fetch file content."));
                    setIsActive(true)
            } else {
                alert("Please select a file first.");
            }
            setEditingFilePath(""); // Reset editing file path
            setCreatingFilePath(""); // Reset creating file path
        }
    };

    return (
        <div className="lg-max-w mx-3">
            <BoldHeading text="Edit Workflow" />
            <br></br>
            <p className="text-xl">
                Deployment status: {githubActionsStatus.message} 
                <br />
                Last successful run: {lastSuccessfulRun}
                <br></br>
                <br></br>
                {githubActionsStatus.icon}
            </p>
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
                        {markdownFiles.length > 0 ? <ol>
                            {markdownFiles.map(file => (
                                file.includes("List.md") ? ( // Check if the file contains or ends with List.md
                                    <li key={file} 
                                        onClick={() => setSelectedFilePath(file)} 
                                        style={{ 
                                            cursor: "pointer", 
                                            textDecoration: "underline", 
                                            backgroundColor: selectedFilePath === file ? "#e0f7fa" : "yellow", //"#ffeb3b", // Highlight List.md with a yellow background
                                            fontWeight: "bold", // Make it bold
                                            padding: "5px", // Add some padding
                                            border: "1px solid #000", // Add a border
                                            marginBottom: "10px" // Add spacing below
                                        }}
                                    >
                                        [Edit this file for List Structure] {file}
                                    </li>
                                ) : (
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
                                )
                            ))}
                        </ol> : <div>&nbsp;&nbsp; Loading...</div>}
                    </li>
                )}
            
                {(markdownFiles.length > 0 && isLoggedIn && !isActive) && (
                    <li className="text-xl">
                        <div>
                            <p>Select an action:</p>
                            {/* {activeAction !== "view" && ( */}
                                <Button text="See File Content" 
                                        buttonClickHandler={() => handleActionSelection("view")} 
                                />
                             {/* )} */}
                            {/* {activeAction !== "create" && ( */}
                                <Button text="Create New File" 
                                        buttonClickHandler={() => handleActionSelection("create")} 
                                />
                            {/* )} */}
                            {/* {activeAction !== "edit" && ( */}
                                <Button text="Edit Existing File" 
                                        buttonClickHandler={() => handleActionSelection("edit")} 
                                />
                            {/* )} */}
                        </div>
                    </li>
                )}
                <p style={{color:"#FF0000", fontWeight:"bold"}}>*** Please be careful here, you are encouraged to edit the text elsewhere, and paste it here for saving. There is no recovery mechanism here in case the browser gets closed/crashes, changes will be lost.***</p>
                <br></br>
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