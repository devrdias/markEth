import React, { Component } from 'react'

class ProfileForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber,
      profilePicture: this.props.profilePicture,
      userType: this.props.userType,
      userState: this.props.userState
    }
  }

  onInputChange(event) {
    this.setState({ name: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.name.length < 2)
    {
      return alert('Please fill in your name.')
    }

    this.props.onProfileFormSubmit(this.state.name)
  }

  render() {
    const ipfs = `https://ipfs.infura.io/ipfs/${this.state.profilePicture}`;
    console.log(this.state.profilePicture);
    // const ipfs = 'https://ipfs.infura.io/ipfs/QmPqGdSKuHUDwK3Yj9o5LzqvW1w1ha8xWGmRaJ1rEwXmhY';
    return(
    // return(
      <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
        <fieldset>
          <label htmlFor="name">Name: <b>{this.state.name}</b></label>
          <label htmlFor="email">email: <b>{this.state.email}</b></label>
          <label htmlFor="phoneNumber">Phone: <b>{this.state.phoneNumber}</b></label>
          Profile Picture: <p><img src={ipfs}/></p>
          <label htmlFor="userType">User Type: <b>{this.state.userType}</b></label>
          <label htmlFor="userState">User State: <b>{this.state.userState}</b></label>
          <br/>
        </fieldset>
      </form>
    )
  }
}

export default ProfileForm
