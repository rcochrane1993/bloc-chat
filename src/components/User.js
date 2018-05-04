import React, { Component } from 'react';


class User extends Component {
  constructor(props) {
      super(props);
    this.signIn= this.signIn.bind(this);
    this.signOut= this.signOut.bind(this);
    this.state = {
      loggedIn : false
    }
}

componentDidMount(){
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  })
}
signIn(){
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider )
  this.setState({loggedIn: true});
}

signOut(){
  this.props.firebase.auth().signOut();
  this.setState({loggedIn: false});
}
render() {

    return (
      <section className='user-authentification'>
        <button id='sign-in-button' onClick={this.signIn}>Sign-In</button>
        <button id='sign-out-button' onClick={this.signOut}>Sign-Out</button>
        {this.state.loggedIn === true ?
        (<span>{this.props.user.displayName}</span>):
        (<span>Guest</span>)}
      </section>
    )
  }
}
export default User;
