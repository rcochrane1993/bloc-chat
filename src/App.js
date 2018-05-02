import React, {Component} from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/messageList'

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
    constructor(props) {
        super(props);
        this.state = {
            activeRoom: "room 4"
        }
    }

    selectRoom(e) {
        this.setState({
            activeRoom: e.target.value
        })
    }
    render() {
        return (
        <section>
          <aside>
            <h1>Bloc Chat</h1>
            <section>
              <RoomList
                firebase={firebase}
                selectRoom={(e) => this.selectRoom(e)}
                />
            </section>
          </aside>
          <body>
            <div id='message-list'>
              <MessageList firebase={firebase} selectRoom={(e) => this.selectRoom(e)} activeRoom={this.state.activeRoom}/>
            </div>
          </body>
        </section>
        );
    }
}

export default App;
