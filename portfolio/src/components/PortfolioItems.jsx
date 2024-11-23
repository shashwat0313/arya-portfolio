import BoldHeading from "./text/BoldHeading";
import '../components/css/ol-list.css'
import '../components/css/ol-list.css'
import SmallText from "./text/SmallText";
import { Link } from "react-router-dom";
import {traderelations, outerspace, mythology, internship, titansub, blrheatwave, myopia, artlimitations, externalArticleInternship} from './article-ids'

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
                <li className="font-piazzolla ">Soft Articles for College Newsletter
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"><Link to={"/works/" + traderelations} className="underline"><SmallText text="How Trade Relations Play A Role In Ensuring International Peace" /></Link></li>
                        <li className="text-xl"><Link to={"/works/" + outerspace} className="underline"><SmallText text="Outer Space, Stories, and Pop Culture" /></Link> </li>
                        <li className="text-xl"><Link to={"/works/" + mythology} className="underline"> <SmallText text="Are Different Interpretations of Mythology Valid?" /></Link></li>
                    </ol>
                </li>
                <li className="font-piazzolla">Authored Article (for internship)
                    <p className="text-lg ml-5 font-semibold">Has the Indian consumption of nuts and dry-fruits grown as much as the West, and is there space for growth from that perspective?</p>
                    <ul className="custom-list ml-8">
                        <li className="text-xl"> <Link to={"/works/" + internship} className="underline"> <SmallText text="Text" /> </Link> </li>
                        <li className="text-xl"> <Link to={externalArticleInternship} className="underline"><SmallText text="Link to Article" /> </Link></li>
                    </ul>
                </li>
                <li className="font-piazzolla">Hard News Articles for College Newsletter
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"> <Link to={"/works/" + titansub} className="underline"> <SmallText text="The Titan Sub Fiasco: All You Need To Know" /> </Link> </li>
                        <li className="text-xl"> <Link to={"/works/" + blrheatwave} className="underline">  <SmallText text="Bengaluru Heatwave" /> </Link> </li>
                    </ol>
                </li>
                <li className="font-piazzolla">Poems
                    <p></p>
                    <ol className="custom-ol-list">
                        <li className="text-xl"><Link to={"/works/" + myopia} className="underline"><SmallText text="Myopia" /></Link></li>
                        <li className="text-xl"><Link to={"/works/" + artlimitations} className="underline"><SmallText text="Limitations on Art" /></Link></li>
                    </ol>
                </li>
            </ol>
        </div>
    );
};

export default PortfolioItems;