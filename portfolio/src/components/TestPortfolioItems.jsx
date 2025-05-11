import { Link } from "react-router-dom";
import BoldHeading from "./text/BoldHeading";
import { BASE_URL } from "../Constants";
import ListViewer from "../TwoLevelListComponents/ListViewer";

export default function TestPortfolioItems(){
    return (
        <div className="lg-max-w mx-3">
            <br></br>
            <Link to={`${BASE_URL}/`}>
            <div className="ml-5 font-piazzolla text-green-600 text-base font-bold text underline">Back to Homepage</div>
            </Link>
            <div className="italic">
                <BoldHeading text="An Overview of my works: soft news articles, hard news articles, an authored article, and original poems." />
            </div>
            <br></br>
            <ListViewer/>
        </div>
    )
}