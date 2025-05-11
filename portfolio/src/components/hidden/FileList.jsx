export default function FileList({setSelectedFilePath, filesStatus, markdownFiles}){
    return (
        <>
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
        </>
    )
}