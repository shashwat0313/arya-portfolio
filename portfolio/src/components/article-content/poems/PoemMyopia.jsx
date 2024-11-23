import TextParagraph from "../../text/TextParagraph";
import BoldHeading from "../../text/BoldHeading";

const PoemMyopia = () => {
    return (
        <div className="text-center">
            <br></br>
            <BoldHeading text="Myopia" />
            <br></br>
            <TextParagraph text={`Traffic headlights in the distance\nblurred because of my damned eyesight\nAre they too close for me to cross the road\nor far away, rushing towards me?`} />
            <TextParagraph text={`I glare back at the blinding lights (lol)\nMy eyesight has deteriorated in recent years\nBut really, I’ve always been bad\nat looking far ahead`} />
            <TextParagraph text={`Would it be poetic coincidence\nor a twisted joke at my expense\nthat my inability to think about the future\nis what cursed me\ninto needing to put on\ntwo pairs of glasses in cinema halls?`} />
        </div>
    );
};

export default PoemMyopia;