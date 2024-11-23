import Heading1 from './text/Heading1';
import TextParagraph from './text/TextParagraph';
import BoldHeading from './text/BoldHeading';
import TwoColumns from './TwoColumns';

const HomeContent = () => {
    return (
        <div className="lg-max-w">
            <Heading1 text='A quick learner and team player with great communication skills, always aiming to deliver efficient and high quality results.' />

            <TextParagraph text={"I’ve graduated from Bengaluru City University with a strong foundation in writing, editing, public relations, advertising, and various digital media and software."} />
            <TextParagraph text={"Committed to bringing a fresh and multifaceted perspective to the table."} />
            <TextParagraph text={"In my free time, you can find me either strumming on my electric guitar, exploring niche interests online (like mechanical keyboards or Japanese model kits!), writing poems, or exploring new cuisines and exciting restaurants :)"} />
            <br></br>
            
            <BoldHeading text='Work Experience' />

            <TwoColumns/>
        </div>
    );
};

export default HomeContent;