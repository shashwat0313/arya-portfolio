import SmallText from "../text/SmallText";

export default function TheGoodEdgeIntern(){
    return (
        <>
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
                        <li><SmallText text="Conducted research, analyzation, and documentation several different high-profile events for clients (Fintech and consulting)" /></li>
                        <li><SmallText text="Developed FMCG Ecommerce, Retail competitor list, and media list for client" /></li>
                    </ul>
            </div>
        </>
    )
}