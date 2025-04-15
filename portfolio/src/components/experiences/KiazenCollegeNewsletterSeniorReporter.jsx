import SmallText from "../text/SmallText";

export default function KaizenCollegeNewsletterSeniorReporter(){
    return (
        <>
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
        </>
    )
}