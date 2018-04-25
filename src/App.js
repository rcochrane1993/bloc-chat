import React, { Component } from 'react';
import * as firebase from 'firebase';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA6FDhuuQqHH_-cdkMQEqCJWGt66WfToes",
    authDomain: "bloc-chat-c0e4e.firebaseapp.com",
    databaseURL: "https://bloc-chat-c0e4e.firebaseio.com",
    projectId: "bloc-chat-c0e4e",
    storageBucket: "bloc-chat-c0e4e.appspot.com",
    messagingSenderId: "984603383451"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
