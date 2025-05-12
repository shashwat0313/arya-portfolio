export default function FileViewer({fileContent, textAreaRef}){

    return (
        <>
                        {fileContent && (
                            <textarea
                                ref={textAreaRef} // Attach the reference to the text area
                                value={fileContent}
                                readOnly // Make the text area non-editable
                                placeholder="File content will appear here"
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
                        )}

        </>
    )

}