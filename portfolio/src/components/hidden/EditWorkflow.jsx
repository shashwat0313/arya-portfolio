import { useState, useEffect } from "react";
import axios from "axios"
import { BACKEND_BASE_URL } from "../../Constants";

export default function EditWorkflow() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [health, setHealth] = useState("Checking...");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
        }

        // Health check GET call
        axios.get(`${BACKEND_BASE_URL}/`)
            .then(response => {
                console.log(`hitting get ${BACKEND_BASE_URL}/ .... response: ${response}`);
                if (response.status === 200) {
                    setHealth("Okay");
                } else {
                    setHealth("Bad");
                }
            })
            .catch(() => {
                setHealth("Bad");
            });
    }, []);

    function loginSubmitHandler(e) {
        console.log("onSubmit called.(login)");
        e.preventDefault();

        const passcode = e.target.passcode.value;

        axios.post(`${BACKEND_BASE_URL}/auth/login`, { passcode })
            .then(response => {
                const data = response.data;
                console.log("data from response after json: " + data);
                localStorage.setItem("token", data.token);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error("Error during login:", error);
            });
    }

    return (
        <>
            Backend Health: {health}
            <form method="POST" onSubmit={loginSubmitHandler}>
                <label htmlFor="passcode">Enter Passcode:</label>
                <input
                    type="password"
                    id="passcode"
                    name="passcode"
                    placeholder=""
                    required
                />
                <button type="submit">Submit</button>
            </form>

            You are {isLoggedIn ? "logged in" : "not logged in"}.
        </>
    );
}