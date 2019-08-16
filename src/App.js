import React ,{ Component } from "react";
// import Web3 from "web3";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import UserRegistration from "./components/userRegistration.jsx";
import Paintings from "./components/paintings.jsx";
// import UserManagerContract from './contracts/UserManager.json';
// import DeMuseContract from './contracts/DeMuse.json';
// import TheMuseumContract from './contracts/TheMuseum.json';
// import getWeb3 from './utils/getWeb3';

class App extends Component {

  // state = {
  //   umInstance: undefined,
  //   deMuse: undefined,
  //   museum: undefined,
  //   web3: null,
  //   admin: null

  // }
  
  // componentDidMount = async () => {
  //   try {
  //     // Get network provider and web3 instance.
  //     const web3 = await getWeb3();

  //     // Use web3 to get the user's accounts.
  //     const accounts = await web3.eth.getAccounts();

  //     // Get the contract instance.
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = UserManagerContract.networks[networkId];
  //     const umInstance = new web3.eth.Contract(
  //       UserManagerContract.abi,
  //      deployedNetwork && deployedNetwork.address,
  //     );

  //     const deMuse = new web3.eth.Contract(
  //       DeMuseContract.abi,
  //      deployedNetwork && deployedNetwork.address,
  //     );

  //     const museum = new web3.eth.Contract(
  //       TheMuseumContract.abi,
  //      deployedNetwork && deployedNetwork.address,
  //     );

  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ umInstance: umInstance, web3: web3, admin: accounts[0], deMuse: deMuse, museum: museum})
  //     // this.addEventListener(this)

  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     alert(
  //       `Failed to load web3, accounts, or contracts. Check console for details.`
  //     );
  //     console.log(error);
  //   }

  //   console.log("UserManagerContract:",this.state.umInstance);
  //   console.log("DeMuseContract:",this.state.deMuse);
  //   console.log("TheMuseumContract:",this.state.museum);
  // };

  // async loadBlockChaindata(){
  //   const web3 = new Web3( Web3.givenProvider || "http://localhost:8545")
  //   const network = await web3.eth.net.getNetworkType()
  //   const accounts = await web3.eth.getAccounts()
  //   console.log("network:",network)
  //   console.log("accounts:",accounts)
  // }

  render(){
    return (
      <React.Fragment>
      <Navbar />
      <main className="container">
        <UserRegistration />
        <Paintings />
      </main>
      </React.Fragment>
    );
  }
}

export default App;
