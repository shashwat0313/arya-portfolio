import SmallText from "./text/SmallText";
import BoldHeading from "./text/BoldHeading";
import './css/ul-list.css'

const TwoColumns = () => {
    return (
        <div className="flex">
            <div className="w-1/2 p-4 m">
            <br></br>
                <p className="font-piazzolla text-xl font-semibold">Intern</p>
                <br></br>
                <p className="font-piazzolla text-2xl font-bold">The Good Edge | 2024</p>
                <br></br>
                <ul className="custom-list">
                    <li><SmallText text="Wrote and placed an authored article for CMO of client company (Pro-V Foods)" /></li>
                    <li><SmallText text="Placed a special feature for aforementioned CMO in IMAGES Retail" /></li>
                    <li><SmallText text="Updated firm's internal database of journalists, editors, and writers" /></li>
                    <li><SmallText text="Researching, analysing, and documenting several different high-profile events for clients (McKinsey and FIA Global)" /></li>
                    <li><SmallText text="Made FMCG Ecommerce, Retail competitor list, and media list for client (ProV foods)" /></li>
                </ul>
            </div>
            <div className="w-1/2 p-4">
            <br></br>
                <p className="font-piazzolla text-xl font-semibold">Senior Reporter</p>
                <br></br>
                <p className="font-piazzolla text-2xl font-bold">Kaizen - college newsletter | 2023-2024</p>
                <br></br>
                <ul className="custom-list">
                    <li><SmallText text="2-3 articles published monthly" /></li>
                    <li><SmallText text="Wrote articles for both hard news and soft news sections Covered current issues and topics ranging from popular culture to Indian history to astronomy" /></li>
                    <li><SmallText text="Managed and provided guidance to team of junior reporters" /></li>
                </ul>
            </div>
        </div>
    );
};

export default TwoColumns;