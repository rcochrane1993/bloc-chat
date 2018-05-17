import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.deleteRoom= this.deleteRoom.bind(this)
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

   deleteRoom(room){
     console.log(room)
   }

   handleChange(e){
     this.setState({newRoomName: e.target.value})
   }

  render() {
    return (
      <section className='RoomList'>
        {
          this.state.rooms.map((room, index) =>
        <ul className="chat-room-list" key={index} >
          <li onClick={() => this.props.selectRoom(room)}>{room.name}
            <button onClick={() => this.deleteRoom(room)}> Delete Room</button>
          </li>
        </ul>)
        }
        <form onSubmit={this.createRoom}>
          <input type="text" onChange={this.handleChange} value={this.state.newRoomName} />
          <button input type='submit'>Create Room</button>
          <button>Delete Room</button>
        </form>

      </section>
    )
  }
}

export default RoomList;
