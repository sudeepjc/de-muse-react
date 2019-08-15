import React ,{ Component } from "react";
import Web3 from "web3";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import UserRegistration from "./components/userRegistration.jsx";
import Paintings from "./components/paintings.jsx";

class App extends Component {
  
  componentWillMount(){
    this.loadBlockChaindata()
  }

  async loadBlockChaindata(){
    const web3 = new Web3( Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType()
    const accounts = await web3.eth.getAccounts()
    console.log("network:",network)
    console.log("accounts:",accounts)
  }

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
