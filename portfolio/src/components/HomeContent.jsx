import Heading1 from './text/Heading1';

import TextParagraph from './text/Text';

const HomeContent = () => {
    return (
        <div className="lg-max-w">
            <Heading1 text='A quick learner and team player with great communication skills, always aiming to deliver efficient and high quality results.'>
            </Heading1>
            <TextParagraph text={"I’ve graduated from Bengaluru City University with a strong foundation in writing, editing, public relations, advertising, and various digital media and software."}></TextParagraph>
            <TextParagraph text={"Committed to bringing a fresh and multifaceted perspective to the table."}></TextParagraph>
            <TextParagraph text={"In my free time, you can find me either strumming on my electric guitar, exploring niche interests online (like mechanical keyboards or Japanese model kits!), writing poems, or exploring new cuisines and exciting restaurants :)"}></TextParagraph>
        </div>
    );
};

export default HomeContent;