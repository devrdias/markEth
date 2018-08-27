import React, { Component } from 'react';
import ipfs from '../../../ipfs';

class SignUpForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			phoneNumber: '',
			profilePicture: '',
			userType: 'Buyer',
			buffer: '',
			ipfsHash: '',
			canSubmit: false,
			loadingPicture: false
		};
	}

	onInputChange(event) {
		console.log(event.target.id);
		let newState = {};
		newState[event.target.id] = event.target.value;
		this.setState(newState);
	}

	onRoleChange(event) {
		console.log(event.target.value);
		this.setState({
			userType: event.target.value
		});
	}

	onProfilePictureChange(event) {}

	handleSubmit(event) {
		event.preventDefault();

		if (this.state.name.length < 2) {
			return alert('Please fill in your name.');
		}

		this.props.onSignUpFormSubmit(
			this.state.name,
			this.state.email,
			this.state.phoneNumber,
			this.state.ipfsHash,
			this.state.userType
		);
	}

	handleUploadProfilePicture = async () => {
		this.setState({ loadingPicture: true, canSubmit: false });
		//save document to IPFS,return its hash#, and set hash# to state
		//https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
		await ipfs.add(this.state.buffer, (err, ipfsHash) => {
			console.log('err', err, 'ipfsHash', ipfsHash);
			//setState by setting ipfsHash to ipfsHash[0].hash
			this.setState({ ipfsHash: ipfsHash[0].hash });

			this.setState({ loadingPicture: false, canSubmit: true });
		});
	};

	captureFile = (event) => {
		event.stopPropagation();
		event.preventDefault();
		const file = event.target.files[0];
		let reader = new window.FileReader();
		reader.readAsArrayBuffer(file);
		reader.onloadend = () => this.convertToBuffer(reader);
	};

	convertToBuffer = async (reader) => {
		//file is converted to a buffer to prepare for uploading to IPFS
		const buffer = await Buffer.from(reader.result);
		//set this buffer -using es6 syntax
		this.setState({ buffer });
	};

	render() {
		return (
			<form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>
				<fieldset>
					<input
						id="name"
						type="text"
						value={this.state.name}
						onChange={this.onInputChange.bind(this)}
						placeholder="Name"
						required
					/>
					<input
						id="email"
						type="email"
						value={this.state.email}
						onChange={this.onInputChange.bind(this)}
						placeholder="Email"
						required
					/>
					<input
						id="phoneNumber"
						type="text"
						value={this.state.phoneNumber}
						onChange={this.onInputChange.bind(this)}
						placeholder="Phone Number"
						required
					/>
					{/* <input id="profilePicture" type="text" value={this.state.profilePicture} onChange={this.onInputChange.bind(this)} placeholder="Profile Image" required/> */}
					<label htmlFor="file">Profile Picture IPFS</label>
					<input id="profilePicture" type="file" onChange={this.captureFile.bind(this)} />
					<button
						type="button"
						disabled={this.state.loadingPicture}
						onClick={this.handleUploadProfilePicture.bind(this)}
						className="pure-button pure-button-primary"
					>
						Upload
					</button>{' '}
					IPFS Hash: {this.state.loadingPicture ? 'Uploading image...' : this.state.ipfsHash}
					<label htmlFor="role">Your Role:</label>
					<label>
						<input
							type="radio"
							value="Buyer"
							checked={this.state.userType === 'Buyer'}
							onChange={this.onRoleChange.bind(this)}
						/>
						Buyer
					</label>
					<label>
						<input
							type="radio"
							value="Seller"
							checked={this.state.userType === 'Seller'}
							onChange={this.onRoleChange.bind(this)}
						/>
						Seller
					</label>
					<label>
						<input
							type="radio"
							value="Arbiter"
							checked={this.state.userType === 'Arbiter'}
							onChange={this.onRoleChange.bind(this)}
						/>
						Arbiter
					</label>
					<br />
					<button type="submit" disabled={!this.state.canSubmit} className="pure-button pure-button-primary">
						Sign Up
					</button>
				</fieldset>
			</form>
		);
	}
}

export default SignUpForm;
