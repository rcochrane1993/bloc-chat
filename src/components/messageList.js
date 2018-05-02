import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.messagesRef = this.props.firebase.database().ref('messages') //not sure what to reference here
    }

    componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            message.username = snapshot.username;
            message.content = snapshot.content;
            message.sentAt = snapshot.sentAt;
            message.roomId = snapshot.roomId;
            this.setState({
                messages: this.state.messages.concat(message)
            });
        });
    }

    render() {
        return (
      <section className='MessageList' >
        <table id="messages-sent">
          <colgroup>
            <col id ="username-column"/>
            <col id ="time-sent-column"/>
            <col id ="content-column"/>
          </colgroup>
          <tbody>
            { this.state.messages.map((message,index) =>
              <tr className="message-data" key={index}>
                <td className="username">{message.username}</td>
                <td className="time-sent">{message.sentAt}</td>
                <td className="content">{message.content}</td>
              </tr>
             )
          }
          </tbody>
        </table>
      </section>);
    }
}

export default MessageList;
