import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "./Button";
import { BACKEND_BASE_URL } from "../../Constants";

export default function CreateFile({ fileList, creatingFilePath }) {
    const [articleId, setArticleId] = useState(creatingFilePath || "");
    const [category, setCategory] = useState("");
    const [fileContent, setFileContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [waitTime, setWaitTime] = useState(0); // State to track remaining wait time
    const [waitInterval, setWaitInterval] = useState(null); // State to store the interval ID
    const [saveTimerId, setSaveTimerId] = useState(null)

    // Restore data from localStorage on mount
    useEffect(() => {
        const savedArticleId = localStorage.getItem("createFile_articleId");
        const savedContent = localStorage.getItem("createFile_content");
        const savedCategory = localStorage.getItem("createFile_category");

        if (savedArticleId || savedContent || savedCategory) {
            alert("Restored unsaved data from your last session. Please review and save.");
            if (savedArticleId) setArticleId(savedArticleId);
            if (savedContent) setFileContent(savedContent);
            if (savedCategory) setCategory(savedCategory);
        }
    }, []);

    // Sync data to localStorage continuously
    useEffect(() => {
        localStorage.setItem("createFile_articleId", articleId);
        localStorage.setItem("createFile_content", fileContent);
        localStorage.setItem("createFile_category", category);
    }, [articleId, fileContent, category]);

    const handleSave = () => {
        if(saveTimerId && waitTime > 0){
            // Cancel the timer if the button is pressed again during the wait
            clearInterval(waitInterval);
            setWaitTime(0);
            setWaitInterval(null);
            setErrorMessage("Save action canceled.");
            clearTimeout(saveTimerId)
            setSaveTimerId(null);
            return;
        }

        if (!articleId || !category || !fileContent) {
            setErrorMessage("Please fill in all fields before saving.");
            return;
        }

        if (fileList.includes(articleId)) {
            setErrorMessage("The provided article ID already exists. Please choose a unique ID.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMessage("You must be logged in to save files.");
            return;
        }

        // const userConfirmed = window.confirm(
        //     "Are you sure you want to save this file? You will have to wait 10 seconds to confirm. Press the button again to cancel."
        // );
        // if (!userConfirmed) return;

        setWaitTime(10); // Initialize wait time to 10 seconds
        const interval = setInterval(() => {
            setWaitTime((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setWaitInterval(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        setWaitInterval(interval);

        const saveTimerId_curr = setTimeout(() => {
            if (waitTime === 0) {
                setIsSaving(true);

                const filePath = `portfolio/src/assets/markdowns/${category || "uncategorized"}/${articleId}.md`;

                axios
                    .post(
                        `${BACKEND_BASE_URL}/github-api/commit-file`,
                        {
                            filePath,
                            content: fileContent,
                            commitMessage: `Creating new file: ${articleId}`,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                    .then(() => {
                        setErrorMessage("");
                        alert("File created successfully.");
                        setArticleId("");
                        setCategory("");
                        setFileContent("");
                        localStorage.removeItem("createFile_articleId"); // Clear localStorage on successful save
                        localStorage.removeItem("createFile_content");
                        localStorage.removeItem("createFile_category");
                        setIsSaving(false);
                    })
                    .catch((error) => {
                        console.error("Error creating file:", error);
                        if (error.response && error.response.data && error.response.data.error) {
                            setErrorMessage(`Failed to create file: ${error.response.data.error}`);
                        } else {
                            setErrorMessage("Failed to create file due to an unknown error.");
                        }
                        setIsSaving(false);
                    });
            }
        }, 10000); // 10-second mandatory wait

        setSaveTimerId(saveTimerId_curr);
    };

    const validateArticleId = (id) => /^[a-z-]*$/.test(id); // Allow lowercase letters and hyphens

    const handleArticleIdChange = (e) => {
        const id = e.target.value;
        if (validateArticleId(id)) {
            setArticleId(id);
            setErrorMessage(""); // Clear error message on valid input
        } else {
            setErrorMessage("Article ID must only contain lowercase letters or hyphens.");
        }
    };

    return (
        <div className="">
            <div>
                <label htmlFor="articleId">Article ID (unique, lowercase, no special characters):</label>
                <input
                    id="articleId"
                    type="text"
                    value={articleId}
                    onChange={handleArticleIdChange}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        caretWidth: "2px", // Make the cursor thicker
                        padding: "8px", // Add padding to the text
                        border: "3px solid black", // Make the border thicker and set to black
                        borderRadius: "4px", // Add slight rounding to the corners
                    }}
                    disabled={!!creatingFilePath} // Disable input if pre-filled
                />
            </div>
                {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}
            <div>
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px", // Add padding to the text
                        border: "3px solid black", // Make the border thicker and set to black
                        borderRadius: "4px", // Add slight rounding to the corners
                    }}
                    >
                    <option value="">Select a category</option>
                    <option value="soft-articles">Soft Article</option>
                    <option value="hard-articles">Hard Article</option>
                    <option value="internship">Internship Article</option>
                    <option value="poems">Poem</option>
                    <option value="uncategorized">Uncategorized</option>
                </select>
            </div>
            <div>
                <label htmlFor="fileContent">Content:</label>
                <textarea
                    id="fileContent"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    style={{ 
                        width: "100%", 
                        height: "75vh", // Set height to 35% of the viewport height
                        marginTop: "10px", 
                        padding: "8px", // Add padding to the text
                        border: "3px solid black", // Make the border thicker and set to black
                        borderRadius: "4px", // Add slight rounding to the corners
                        caretWidth: "2px", // Make the cursor thicker
                    }}
                />
            </div>
            <Button
                text={
                    waitTime > 0
                        ? `Waiting ${waitTime} sec... (Press again to cancel)`
                        : isSaving
                        ? "Saving..."
                        : "Save File"
                }
                buttonClickHandler={handleSave}
                disabled={isSaving}
            />
        </div>
    );
}

CreateFile.propTypes = {
    fileList: PropTypes.arrayOf(PropTypes.string).isRequired,
    creatingFilePath: PropTypes.string, // New prop for pre-filled article ID
};
