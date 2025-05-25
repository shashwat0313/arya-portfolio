import { useEffect, useState, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Button from "./Button";
import { BACKEND_BASE_URL } from "../../Constants";

export default function EditFile({ editingFilePath }) {
    const [fileContent, setFileContent] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [waitTime, setWaitTime] = useState(0); // State to track remaining wait time
    const [waitInterval, setWaitInterval] = useState(null); // State to store the interval ID
    const textAreaRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to edit files.");
            return;
        }

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
        if (waitTime > 0) {
            clearInterval(waitInterval);
            setWaitTime(0);
            setWaitInterval(null);
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to save changes.");
            return;
        }

        const userConfirmed = window.confirm(
            "Are you sure you want to save changes to this file? You will have to wait 10 seconds to confirm. Press the button again to cancel."
        );
        if (!userConfirmed) return;

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

        setTimeout(() => {
            if (waitTime === 0) {
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
            }
        }, 10000); // 10-second mandatory wait
    };

    if (isLoading) {
        return <div>Loading file content...</div>;
    }

    return (
        <div className="mx-3">
            <div style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Editing File: {editingFilePath}
            </div>
            <textarea
                ref={textAreaRef}
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
            <Button
                text={
                    waitTime > 0
                        ? `Waiting ${waitTime} sec... (Press again to cancel)`
                        : isSaving
                        ? "Saving..."
                        : "Save Changes"
                }
                buttonClickHandler={handleSave}
                disabled={isSaving}
            />
        </div>
    );
}

EditFile.propTypes = {
    editingFilePath: PropTypes.string.isRequired,
};
