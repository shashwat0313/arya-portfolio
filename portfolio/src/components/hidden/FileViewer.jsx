export default function FileViewer({fetchFileContent, selectedFilePath, setSelectedFilePath, fileContent, textAreaRef, setFileContent}){

    return (
        <>
        
        {/* <form onSubmit={(e) => { e.preventDefault(); fetchFileContent({selectedFilePath, setf}); }} style={{ marginTop: "15px" }}>
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
                        </form> */}
                        {fileContent && (
                            <textarea
                                ref={textAreaRef} // Attach the reference to the text area
                                value={fileContent}
                                readOnly // Make the text area non-editable
                                placeholder="File content will appear here"
                                style={{ width: "100%", height: "200px", marginTop: "10px" }}
                            />
                        )}

        </>
    )

}