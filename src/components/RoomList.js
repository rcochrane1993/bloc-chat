import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.state = {
      rooms: [],
      newRoomName: ""
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
  }



  componentDidMount() {
     this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) });
     });
   }

   createRoom(e){
     e.preventDefault();
     this.roomsRef.push({
       name: this.state.newRoomName
     });
   }

   handleChange(e){
     this.setState({newRoomName: e.target.value})
   }

  render() {
    return (
      <section className='RoomList'>
        {
          this.state.rooms.map((room, index) =>
        <ul className="chat-room-list" key={index} onClick={this.props.selectRoom} >
          <li>{room.name}</li>
        </ul>)
        }
        <form onSubmit={this.createRoom}>
          <input type="text" onChange={this.handleChange} value={this.state.newRoomName} />
          <input type="submit"/>
        </form>

      </section>
    )
  }
}

export default RoomList;
