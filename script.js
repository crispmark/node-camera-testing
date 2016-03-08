import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

//establish connection to server
var socket = io.connect();

//button interface for issuing commands to robot
var Videostream = React.createClass({

  getInitialState: function() {
    return {
      imagesource: "/pic.jpg"
    };
  },

  componentWillMount: function() {
    var vstream = this;
    socket.on('image', function(msg) {
      var buff = msg.buffer;
      var dataView = new DataView(buff);
      var blob = new Blob([dataView], {type: "image/png"});
      var url = URL.createObjectURL(blob);
      vstream.setState({imagesource: url});
      vstream.forceUpdate();
      console.log('frame received');
    });
  },

  render: function() {
    var imagesource = this.state.imagesource;
    return <div>
      <image src={imagesource}/>
    </div>
  }
});


// adds buttons to DOM
ReactDOM.render(<Videostream />, document.getElementById('container'));
