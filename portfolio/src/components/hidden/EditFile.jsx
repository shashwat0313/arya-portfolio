import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "./Button";
import { BACKEND_BASE_URL } from "../../Constants";

export default function EditFile({ editingFilePath }) {
    const [fileContent, setFileContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const textAreaRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to edit files.");
            return;
        }

        // Fetch file content from GitHub
        axios
            .get(`${BACKEND_BASE_URL}/github-api/file-content`, {
                params: {
                    filepath: editingFilePath,
                    branch: "main",
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setFileContent(response.data.content);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching file content:", error);
                alert("Failed to fetch file content.");
                setIsLoading(false);
            });
    }, [editingFilePath]);

    const handleSave = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to save changes.");
            return;
        }

        setIsSaving(true);

        // Commit file content to GitHub
        axios
            .post(
                `${BACKEND_BASE_URL}/github-api/commit-file`,
                {
                    filePath: editingFilePath,
                    content: fileContent,
                    commitMessage: "Updating file content.",
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                alert("File saved successfully.");
                setIsSaving(false);
            })
            .catch((error) => {
                console.error("Error saving file:", error);
                alert("Failed to save file.");
                setIsSaving(false);
            });
    };

    if (isLoading) {
        return <div>Loading file content...</div>;
    }

    return (
        <div className="lg-max-w mx-3">
            <textarea
                ref={textAreaRef}
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
            <Button
                text={isSaving ? "Saving..." : "Save Changes"}
                buttonClickHandler={handleSave}
                disabled={isSaving}
            />
        </div>
    );
}

EditFile.propTypes = {
    editingFilePath: PropTypes.string.isRequired,
};
