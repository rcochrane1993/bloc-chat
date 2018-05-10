import React, {Component} from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.createMessage = this.createMessage.bind(this);
        this.handleMsgCreation= this.handleMsgCreation.bind(this);
        this.convertTimestamp= this.convertTimestamp.bind(this);
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
        newMsgSentAt: this.props.firebase.database.ServerValue.TIMESTAMP
      })
    }

    convertTimestamp(timestamp) {
      if (timestamp === undefined) {return;}
      const d = new Date(timestamp),
		    yyyy = d.getFullYear(),
		      mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		      dd = ('0' + d.getDate()).slice(-2),		// Add leading 0.
		      hh = d.getHours(),
		      h = hh !== 0 ? hh % 12 : 12,
		      min = ('0' + d.getMinutes()).slice(-2),// Add leading 0.
		      ampm = hh >= 12 ? 'PM' : 'AM',


	// ie: 2013-02-18, 8:35 AM
	      time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

	return time;
}

    render() {
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
                <td className="time-sent">{this.convertTimestamp(message.sentAt)}</td>
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
