import React from 'react';
import ReactDOM from 'react-dom';

export default class ResponsiveEmbed extends React.Component{
    iframeNode = null;
    embedNode = null;

    render(){
        return <div className="embed-container">
            <embed src={this.props.url} type='text/html' style={{ width: '100%', overflow: 'hidden' }} ref={(node) => this.embedNode = node} />
            <iframe title="sample" width="100%" src={this.props.url} ref={(node) => this.iframeNode = node}/>
        </div>
        
    }

    setHeightForEmbed = () => {
        const iframeDOMNode = ReactDOM.findDOMNode(this.iframeNode);
        const embedDOMNode = ReactDOM.findDOMNode(this.embedNode);

        iframeDOMNode.contentWindow.addEventListener('DOMContentLoaded', () => {
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

                iframeDOMNode.style.display = 'none';
                embedDOMNode.height = height + 'px';

            }
        }, true)

    }

    componentDidMount() {
        this.setHeightForEmbed();
    }
}