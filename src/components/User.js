import React, { Component } from 'react';

class User extends Component {


render() {
const provider = new this.props.firebase.auth.GoogleAuthProvider();
    return (
      <section className='user-authentification'>
        <button id='sign-in-button' onClick={this.props.firebase.auth().signInWithPopup( provider )}>Sign-In</button>
      </section>
    )
  }
}
export default User;
