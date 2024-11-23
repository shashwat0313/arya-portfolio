import { useParams } from 'react-router-dom';
import ArticleTradeRelHeading from './article-content/soft-articles/ArticleTradeRelations';
import { Link } from 'react-router-dom';
import {traderelations, outerspace, mythology, internship, titansub, blrheatwave, myopia, artlimitations} from './article-ids'
import ArticleOuterSpace from './article-content/soft-articles/ArticleOuterSpace';
import ArticleMythology from './article-content/soft-articles/ArticleMythology';

const Article = () => {
    const { articleId } = useParams();

    // IIFE = Immediately Invoked Function Expression
    const articleContentRenderer = () => {
        switch (articleId) {
            case traderelations:
                return (
                    <ArticleTradeRelHeading />
                );
            case outerspace:
                return (<ArticleOuterSpace/>);
            case mythology:
                return (<ArticleMythology/>);
            case internship:
                return <></>;
            case titansub:
                return <></>;
            case blrheatwave:
                return <></>;
            case myopia:
                return <></>;
            case artlimitations:
                return <></>;
            default:
                return null;
        }
    };

    return (
        <div className='lg-max-w'>
            <br></br>
            <Link to="/works">
                <div className="ml-5 font-piazzolla text-green-600 text-base font-bold text underline">Back to Index</div>
            </Link>
            <h2>ArticleId: {articleId}</h2>
            {articleContentRenderer()}
        </div>

    )
};

export default Article;