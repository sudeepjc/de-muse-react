import React, { Component } from "react";
// import Web3 from 'web3';
// import { USER_MANAGER_ABI,USER_MANAGER_ADDRESS }from './userManagerConfig';
import UserManagerContract from '../contracts/UserManager.json'
import getWeb3 from '../utils/getWeb3';
// import { async } from "q";

class UserRegistration extends Component {
  state = { 
    value: "",
    umInstance: undefined,
    web3: undefined,
    users:[]
  };

  componentDidMount= async () =>{
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = UserManagerContract.networks[networkId];
      const umInstance = new web3.eth.Contract(
        UserManagerContract.abi,
       deployedNetwork && deployedNetwork.address,
      );
      this.setState({ umInstance: umInstance, web3: web3})
      this.addEventListener(this)

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contracts. Check console for details.`
      );
      console.log(error);
    }
    // console.log("from User Registration:", this.state.umInstance)
    // console.log("from User Registration:", this.state.web3)
  }

  addEventListener(component) {

    // console.log("from eventLister registration",this.state.umInstance)

    this.state.umInstance.events.UserAdded({fromBlock: 0, toBlock: 'latest'})
    .on('data', function(event){
      // console.log(event); // same results as the optional callback above
      // console.log(event.returnValues)
      let userArray = component.state.users.slice()
      userArray.push(event.returnValues)
      component.setState({ users: userArray })
    })
    .on('error', console.error);
  }

  handleRegistration = async() => {
    let accounts;
    try{
      accounts = await this.state.web3.eth.getAccounts()
      await this.state.umInstance.methods.addUser(this.state.value).send({from: accounts[0]})
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to Add User. Check console for details.`
      );
      console.log(error);
    }
    this.setState({value: ''});
  };

  handleTextChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleIsRegistred = async() => {
    let accounts;
    try{
      accounts = await this.state.web3.eth.getAccounts()
      let isRegistered = await this.state.umInstance.methods.isRegisteredUser(this.state.value).call({from: accounts[0]})
      if(isRegistered){
        alert(
          `User already Registered !`
        );
      }else{
        alert( `Not Registered. Please register for participating in adoption. ` );
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to Add User. Check console for details.`
      );
      console.log(error);
    }
    this.setState({value: ''});
  }

  render() {
    return (
      <div className="m-5">
        <h5>Register User</h5>
        <ul>
          <li style={{ color: 'grey'}}>
            <i>
              Select Address in metamask and input a user name. Then click on{" "} <b>Register</b>
            </i>
          </li>
        </ul>
        <div className="m-2">
          <label>User:</label>
          <input onChange={this.handleTextChange} value={this.state.value} className="m-2" type="text" id="userName" />
          <button onClick={this.handleRegistration} className="btn btn-primary m-2" > Register </button>
          <button onClick={this.handleIsRegistred} className="btn btn-secondary m-2" > Check User </button>
        </div>
        <div >Current Users</div>
        {this.state.users.map(user => (
          <div className="m-1">
            <p style={{ color: 'blue', fontSize: 12 }}>{user.userName} as {user.user}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default UserRegistration;
