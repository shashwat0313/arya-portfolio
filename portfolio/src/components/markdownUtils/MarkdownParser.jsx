import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import IntermediateH1 from './Intermediates/IntermediateH1';
import IntermediateP from './Intermediates/IntermediateP';
import { useEffect } from 'react';

export default function MarkdownParser({ markdown }) {

    useEffect(() => {
        console.log('MarkdownParser component mounted or updated, markdown:', markdown);
    })

    return (
        <ReactMarkdown
            components={{
                h1: IntermediateH1,
                p: IntermediateP,
            }}
        >
            {markdown}
        </ReactMarkdown>
    );
}

MarkdownParser.propTypes = {
    markdown: PropTypes.string.isRequired,
};