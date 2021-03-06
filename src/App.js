import React, {Component} from 'react';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/messageList'
import User from './components/User'

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
            activeRoom: "",
            user: []
        }
    }

setUser(user){
  this.setState({user: user })

}

    selectRoom(room) {
        this.setState({
            activeRoom: room
        })
    }

    render() {
        return (
        <section>
          <div id='message-list'>
            <MessageList
              firebase={firebase}
              selectRoom={(e) => this.selectRoom(e)}
              activeRoom={this.state.activeRoom.key}
              activeRoomName={this.state.activeRoom.name}
              user={this.state.user}
            />
          </div>
          <aside>
            <h1>Bloc Chat</h1>
            <section>
              <RoomList
                firebase={firebase}
                selectRoom={(e) => this.selectRoom(e)}
                activeRoom={this.state.activeRoom}
              />
            </section>
            <div>
              <User
                firebase={firebase}
                setUser={(input) => this.setUser(input)}
                user={this.state.user}
              />
            </div>
          </aside>

        </section>
        );
    }
}

export default App;
