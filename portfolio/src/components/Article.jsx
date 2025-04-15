import { useParams } from 'react-router-dom';
// import ArticleTradeRelHeading from './article-content/soft-articles/ArticleTradeRelations';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../Constants';
// import { traderelations, outerspace, mythology, internship, titansub, blrheatwave, myopia, artlimitations } from './article-ids';
// import ArticleOuterSpace from './article-content/soft-articles/ArticleOuterSpace';
// import ArticleMythology from './article-content/soft-articles/ArticleMythology';
// import ArticleInternShip from './article-content/internship/ArticleInternship';
import { useEffect } from 'react';
// import ArticleTitanSub from './article-content/hard-articles/ArticleTitanSub';
// import ArticleBLRHeatwave from './article-content/hard-articles/ArticleBLRHeatwave';
// import PoemMyopia from './article-content/poems/PoemMyopia';
// import PoemArtLimitations from './article-content/poems/PoemArtLimitations';
// import TestGenericArticle from './markdownUtils/TestGenericArticle';
import GenericArticle from './GenericArticle';

const Article = () => {
    const { articleId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    // const articleContentRenderer = () => {
    //     switch (articleId) {
    //         case traderelations:
    //             return (<ArticleTradeRelHeading />);
    //         case outerspace:
    //             return (<ArticleOuterSpace/>);
    //         case mythology:
    //             return (<ArticleMythology/>);
    //         case internship:
    //             return (<ArticleInternShip/>);
    //         case titansub:
    //             return (<ArticleTitanSub/>);
    //         case blrheatwave:
    //             return (<ArticleBLRHeatwave/>);
    //         case myopia:
    //             return (<PoemMyopia/>);
    //         case artlimitations:
    //             return (<PoemArtLimitations/>);
    //         case "test":
    //             return (<TestGenericArticle />);
    //         default:
    //             return (<Navigate to={`${BASE_URL}/works`} />);
    //     }
    // };

    return (
        <div className='lg-max-w'>
            <br></br>
            <Link to={`${BASE_URL}/works`}>
                <div className="ml-5 font-piazzolla text-green-600 text-base font-bold text underline">Back to Index</div>
            </Link>
            <GenericArticle articleId={articleId} />
        </div>

    )
};

export default Article;