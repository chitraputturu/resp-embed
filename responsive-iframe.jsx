import React from 'react';
import ReactDOM from 'react-dom';

export default class ResponsiveIframe extends React.Component {
    iframeNode = null;

    render() {
        return <div className="embed-container">
            <iframe title="sample" width="100%" scrolling="no" allowFullScreen={true} src={this.props.url} ref={(node) => this.iframeNode = node} />
        </div>
    }

    setHeight = (iframeDOMNode) => {
        if (
            iframeDOMNode &&
            iframeDOMNode.contentWindow &&
            iframeDOMNode.contentWindow.document &&
            iframeDOMNode.contentWindow.document.body
        ) {
            let height = iframeDOMNode.contentWindow.document.body.scrollHeight ? iframeDOMNode.contentWindow.document.body.scrollHeight : 0;
            let marginTop = window.getComputedStyle(iframeDOMNode.contentWindow.document.body).getPropertyValue('margin-top');
            let marginBottom = window.getComputedStyle(iframeDOMNode.contentWindow.document.body).getPropertyValue('margin-bottom');
            if (marginTop) {
                height += parseFloat(marginTop.replace('px', ''))
            }
            if (marginBottom) {
                height += parseFloat(marginBottom.replace('px', '')) + 10;
            }
            iframeDOMNode.height = height + 'px';

        }
    }

    componentDidMount() {
        const iframeDOMNode = ReactDOM.findDOMNode(this.iframeNode);

        iframeDOMNode.contentWindow.addEventListener('DOMContentLoaded', () => {
            this.setHeight(iframeDOMNode)
        }, true);

        iframeDOMNode.contentWindow.addEventListener('resize', () => {
            this.setHeight(iframeDOMNode)
        })

    }

}

