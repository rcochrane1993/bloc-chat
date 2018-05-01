import React, { Component } from 'react';

class messageList extends Component {
  constructor(props){
    super(props);
    this.state={
      messages: []
    }
    this.messagesRef = this.props.firebase.database().ref()//not sure what to reference here
  }

  componentDidMount() {
     this.messagesRef.on('child_added', snapshot => {
       const message = snapshot.val();
       message.key = snapshot.key;
       this.setState({ messages: this.state.messages.concat( message ) });
     });
   }}

  render(){
    return (
      <section className='MessageList' >
      </section>
    )
  }
}

export default messageList;
