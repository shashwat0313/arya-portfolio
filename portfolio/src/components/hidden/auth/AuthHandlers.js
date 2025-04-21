import { BACKEND_BASE_URL } from "../../../Constants";
import axios from "axios";

function loginSubmitHandlerInternal(e, {passcode, setIsLoggedIn, setTokenExpiry}) {
    axios.post(`${BACKEND_BASE_URL}/auth/login`, { passcode })
    .then(response => {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
        const expiryTime = new Date(decodedToken.exp * 1000);
        const timeRemaining = Math.max(0, Math.floor((expiryTime - new Date()) / 1000));
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        setTokenExpiry({ hours, minutes });
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            alert("Unauthorized: Incorrect passcode. Please try again.");
        } else {
            console.error("Error during login:", error);
        }
    });
}

function logoutHandler() {
    localStorage.removeItem("token");
    window.location.reload();
}

function checkAuthStatus({setIsLoggedIn, setTokenExpiry, token}){
    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = new Date(decodedToken.exp * 1000);
        const timeRemaining = Math.max(0, Math.floor((expiryTime - new Date()) / 1000));
        if (timeRemaining > 0) {
            setIsLoggedIn(true);
            const hours = Math.floor(timeRemaining / 3600);
            const minutes = Math.floor((timeRemaining % 3600) / 60);
            setTokenExpiry({ hours, minutes });
        } else {
            localStorage.removeItem("token");
        }
    }
}

export {loginSubmitHandlerInternal, logoutHandler, checkAuthStatus}