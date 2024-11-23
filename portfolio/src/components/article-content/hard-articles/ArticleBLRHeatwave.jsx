import TextParagraph from "../../text/TextParagraph";
import BoldHeading from "../../text/BoldHeading";

const ArticleBLRHeatwave = () => {
    return (
        <div className="text-center">
            <br></br>
            <BoldHeading text="Bengaluru heatwave" />
            <br></br>
            <TextParagraph text="May 16, 2024" />
            <TextParagraph text="Temperatures soar to 39°C in Bengaluru, a record high ever recorded for the garden city. Suffering from an unprecedented rainless April, the state of Karnataka has been going through a severe heatwave. The city was even placed on Orange Alert (meaning ‘be prepared’) by the India Meteorological Department." />
            <TextParagraph text="Whilst maximum temperatures stayed around 37-38 degrees through most parts of the city, the Karnataka State Natural Disaster Monitoring Centre (KSNDMC) reported that the mercury might’ve gone as high as 41.8°C in Kengeri and 41.3°C in Bidarahalli. The minimum temperatures were also uncomfortably high at around 28°C, making for some unpleasant nights." />
            <TextParagraph text="Thankfully, the city finally saw rains from May 3rd onwards, and temperatures dropped down soon." />
        </div>
    );
};

export default ArticleBLRHeatwave;