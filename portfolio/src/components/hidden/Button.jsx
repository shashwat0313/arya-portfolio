export default function Button({text, buttonClickHandler}){
    return (
        <>
            <button
                type="submit" 
                style={{ 
                marginLeft: "10px", 
                border: "1px solid #ccc", 
                padding: "5px 10px", 
                borderRadius: "5px", 
                backgroundColor: "#f5f5f5", 
                cursor: "pointer",
                margin:"1em"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#e0e0e0"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#f5f5f5"}
                onClick={buttonClickHandler}>
                    {text}
            </button>
        </>
    )
}