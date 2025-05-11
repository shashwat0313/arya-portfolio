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
                setErrorMessage("Failed to create file.");
                setIsSaving(false);
            });
    };

    const validateArticleId = (id) => /^[a-z]*$/.test(id); // Allow empty string for validation

    const handleArticleIdChange = (e) => {
        const id = e.target.value;
        if (validateArticleId(id)) {
            setArticleId(id);
            setErrorMessage(""); // Clear error message on valid input
        } else {
            setErrorMessage("Article ID must only contain lowercase letters and no special characters.");
        }
    };

    return (
        <div className="lg-max-w mx-3">
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
                        height: "300px",
                        marginBottom: "10px",
                        caretWidth: "2px", // Make the cursor thicker
                        padding: "8px", // Add padding to the text
                        border: "3px solid black", // Make the border thicker and set to black
                        borderRadius: "4px", // Add slight rounding to the corners
                    }}
                />
            </div>
            {errorMessage && <div style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</div>}
            <Button
                text={isSaving ? "Saving..." : "Save File"}
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
