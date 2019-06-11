import React from 'react';
import ResponsiveIframe from './responsive-iframe';
import ResponsiveEmbed from './responsive-embed';

class App extends React.Component{
  iframeNode = null;

  render(){
    return (<div>
      <h1>HTML test</h1>
      <ResponsiveIframe url='http://localhost:3000/test.html'/>
      {/* <ResponsiveEmbed url='http://localhost:3000/test.html'/> */}
    </div>)
  }

}

export default App;
