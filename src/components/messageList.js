import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.createMessage = this.createMessage.bind(this);
        this.handleMsgCreation= this.handleMsgCreation.bind(this);
        this.state = {
            messages: [],
            newMsgCont: "",
            newMsgSentAt: "",
            newMsgUsr: "",
        }
        this.messagesRef = this.props.firebase.database().ref('messages')
      }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({
                messages: this.state.messages.concat(message)
            });
        });
    }

    createMessage(e){
      e.preventDefault();
      this.messagesRef.push({
        content: this.state.newMsgCont,
        sentAt: this.state.newMsgSentAt,
        username: this.state.newMsgUsr,
        roomId: this.props.activeRoom
      });
    }

    handleMsgCreation(e) {
      this.setState({
        newMsgCont: e.target.value,
        newMsgUsr: this.props.user === [] ? "guest" : this.props.user.displayName,
        newMsgSentAt: "timestamp"
      })
    }

    render() {
      console.log(this.props.activeRoom)
        return (
      <section className='MessageList' >
        <table id="messages-sent">
          <thead>
            <tr>
              <th>{this.props.activeRoomName}</th>
            </tr>
          </thead>
          <colgroup>
            <col id ="username-column"/>
            <col id ="time-sent-column"/>
            <col id ="content-column"/>
          </colgroup>
          <tbody>
            { this.state.messages.map((message,index) =>
              message.roomId === this.props.activeRoom &&
              <tr className="message-data" key={index}>
                <td className="username">{message.username}</td>
                <td className="time-sent">{message.sentAt}</td>
                <td className="content">{message.content}</td>
              </tr>

            )
          }
          </tbody>
        </table>
        <form onSubmit={this.createMessage}>
          <input type="text" onChange={this.handleMsgCreation} value={this.state.newMsgCont} />
          <input type="submit"/>
        </form>
      </section>);
    }
}

export default MessageList;
