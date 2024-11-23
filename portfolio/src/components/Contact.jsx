import BoldHeading from "./text/BoldHeading";
import Heading1 from "./text/Heading1";
import { Link } from "react-router-dom";

const Contact = () => {
    return (
        <>
        <div className="text-center">
            <Link to="/">
            <div className=" font-piazzolla text-green-600 text-base font-bold underline">Back to Homepage</div>
            </Link>
            <br></br>
            <br></br>
            <Heading1 text="Contact Info:"/>
            <BoldHeading text="Email:"/>
            <BoldHeading text="aryashrestha105@gmail.com"/>
        </div>
        </>
    );
};

export default Contact;