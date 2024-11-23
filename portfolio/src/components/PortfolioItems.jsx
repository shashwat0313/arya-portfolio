import BoldHeading from "./text/BoldHeading";
import '../components/css/ol-list.css'
import '../components/css/ol-list.css'
import SmallText from "./text/SmallText";
import { Link } from "react-router-dom";
const PortfolioItems = () => {
    return (
        <div className="lg-max-w mx-3">
            <br></br>
            <Link to="/">
            <div className="ml-5 font-piazzolla text-green-600 text-base font-bold text underline">Back to Homepage</div>
            </Link>
            <div className="italic">
                <BoldHeading text="An Overview of my works: soft news articles, hard news articles, an authored article, and original poems." />
            </div>
            <br></br>
            <ol className="custom-ol-list text-2xl">
                <li className="font-piazzolla">Soft Articles for College Newsletter
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"><SmallText text="How Trade Relations Play A Role In Ensuring International Peace" /></li>
                        <li className="text-xl"><SmallText text="Outer Space, Stories, and Pop Culture" /></li>
                        <li className="text-xl"><SmallText text="Are Different Interpretations of Mythology Valid?" /></li>
                    </ol>
                </li>
                <li className="font-piazzolla">Authored Article (for internship)
                    <p className="text-lg ml-5 font-semibold">Has the Indian consumption of nuts and dry-fruits grown as much as the West, and is there space for growth from that perspective?</p>
                    <ul className="custom-list ml-8">
                        <li className="text-xl"><SmallText text="Text" /></li>
                        <li className="text-xl"><SmallText text="Link to Article" /></li>
                    </ul>
                </li>
                <li className="font-piazzolla">Hard News Articles for College newsletter
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"><SmallText text="The Titan Sub Fiasco: All You Need To Know" /></li>
                        <li className="text-xl"><SmallText text="Bengaluru heatwave" /></li>
                    </ol>
                </li>
                <li className="font-piazzolla">Poems
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"><SmallText text="Myopia" /></li>
                        <li className="text-xl"><SmallText text="Limitations on Art" /></li>
                    </ol>
                </li>
            </ol>
        </div>
    );
};

export default PortfolioItems;