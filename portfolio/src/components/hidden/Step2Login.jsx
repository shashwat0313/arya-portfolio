import Button from "./Button"

export default function Step2Login({isLoggedIn, loginSubmitHandler, tokenExpiry, logoutHandler, health}){
    return (

        <>
        {isLoggedIn ? (
            <>
                You are already authenticated. Time remaining: {tokenExpiry.hours} hours and {tokenExpiry.minutes} minutes.
                <span style={{ color: "green" }}> ✔</span>
                <Button text={"Logout"} buttonClickHandler={logoutHandler}/>
            </>
                ) : (
            <>
                You are not logged in. Please enter passcode:
                <form onSubmit={loginSubmitHandler}>
                    <input
                        type="password"
                        id="passcode"
                        name="passcode"
                        placeholder="Enter passcode"
                        required />
                    <Button text={"Login"} />
                </form>
            </>
        )}
        </>

    )
}