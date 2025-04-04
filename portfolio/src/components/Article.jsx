import { Navigate, useParams } from 'react-router-dom';
import ArticleTradeRelHeading from './article-content/soft-articles/ArticleTradeRelations';
import { Link } from 'react-router-dom';
import {traderelations, outerspace, mythology, internship, titansub, blrheatwave, myopia, artlimitations} from './article-ids'
import ArticleOuterSpace from './article-content/soft-articles/ArticleOuterSpace';
import ArticleMythology from './article-content/soft-articles/ArticleMythology';
import ArticleInternShip from './article-content/internship/ArticleInternship';
import { useEffect } from 'react';
import ArticleTitanSub from './article-content/hard-articles/ArticleTitanSub';
import ArticleBLRHeatwave from './article-content/hard-articles/ArticleBLRHeatwave';
import PoemMyopia from './article-content/poems/PoemMyopia';
import PoemArtLimitations from './article-content/poems/PoemArtLimitations';

const Article = () => {
    const { articleId } = useParams();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    // IIFE = Immediately Invoked Function Expression
    const articleContentRenderer = () => {
        switch (articleId) {
            case traderelations:
                return (<ArticleTradeRelHeading />);
            case outerspace:
                return (<ArticleOuterSpace/>);
            case mythology:
                return (<ArticleMythology/>);
            case internship:
                return (<ArticleInternShip/>);
            case titansub:
                return (<ArticleTitanSub/>);
            case blrheatwave:
                return (<ArticleBLRHeatwave/>);
            case myopia:
                return (<PoemMyopia/>);
            case artlimitations:
                return (<PoemArtLimitations/>);
            default:
                return (<Navigate to="/works" />);
        }
    };

    return (
        <div className='lg-max-w'>
            <br></br>
            <Link to="/works">
                <div className="ml-5 font-piazzolla text-green-600 text-base font-bold text underline">Back to Index</div>
            </Link>
            {articleContentRenderer()}
        </div>

    )
};

export default Article;