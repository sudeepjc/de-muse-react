import React, { Component } from "react";
import DeMuseContract from '../contracts/DeMuse.json';
import TheMuseumContract from '../contracts/TheMuseum.json';
import UserManagerContract from '../contracts/UserManager.json';
import getWeb3 from '../utils/getWeb3';
import Painting from "./painting.jsx";

class Paintings extends Component {
  state = {
    deMuse: undefined,
    museum: undefined,
    umInstance: undefined,
    web3: undefined,
    paintings: [
      {
        id: 111,
        iURL: "/The-Starry-Night-De-sterrennacht-by-Vincent-Van-Gogh.jpg",
        name: "The Starry Night (1889)",
        artist: "Vincent Van Gogh",
        value: 10000000,
        owner:"",
        description:
          "Although painted from memory, this masterpiece depicts the view outside Van Gogh’s sanitarium room window at Saint-Remy-de-Provence in France. The work shows the artist’s interest in astronomy and a study made by the Griffith Park Observatory demonstrated that Vincent represented the Moon, Venus, and several stars in the exact position they occupied that clear night. The painting is considered among the greatest works in western art and is definitely the most famous work of Vincent Van Gogh."
      },
      {
        id: 222,
        iURL: "/Vase-with-Fifteen-Sunflowers-1888-Vincent-Van-Gogh.jpg",
        name: "Vase with Fifteen Sunflowers (1888)",
        artist: "Vincent Van Gogh",
        value: 6000000,
        owner:"",
        description:
          "Vincent Van Gogh is considered a master of still life paintings and his series of paintings on ‘sunflowers’ rank among the most famous still life paintings ever created. The paintings are well known for depicting the natural beauty of the flowers and for their vibrant colors. The above painting which is titled Vase with Fifteen Sunflowers smashed the auction record for a painting when it was sold to a Japanese investor for almost $40 million in March 1987. The record was broken two years later by Van Gogh’s Irises."
      },
      {
        id: 333,
        iURL: "/Cafe-Terrace-at-Night-1888-Vincent-Van-Gogh.jpg",
        name: "Cafe Terrace at Night (1888)",
        artist: "Vincent Van Gogh",
        value: 8000000,
        owner:"",
        description:
          "Also known as The Cafe Terrace on the Place du Forum, this was the first painting in which the artist used starry background. Visitors can still stand at the northeastern corner of the Place du Forum and view the scene depicted by Van Gogh. Cafe Terrace at Night remains one of the most analyzed paintings by Van Gogh and it is debated whether it is an innovative depiction of Last Supper. There are several references to the painting in popular culture and a cafe in Croatia was redesigned to look like the cafe in the painting."
      },
      {
        id: 444,
        iURL: "/Bedroom-in-Arles-1888-Vincent-Van-Gogh.jpg",
        name: "BEDROOM IN ARLES (1888)",
        artist: "Vincent Van Gogh",
        value: 4000000,
        owner:"abc",
        description:
          "This painting is the first version of three similar paintings which are referred to as Bedroom in Arles and were simply titled The Bedroom by Vincent. The three paintings can be differentiated by the pictures hanging on the wall to the right. This version has miniatures of Van Gogh’s portraits of his friends Eugene Boch and Paul-Eugene Milliet on the right wall in the painting. The subject of the painting is Van Gogh’s bedroom at 2, Place Lamartine in Arles, Bouches-du-Rhone, France, famous as his Yellow House."
      }
    ]
  };

  componentDidMount= async () =>{
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      const networkId = await web3.eth.net.getId();

      // Get the contract instance.
      const deMuseDeployedNetwork = DeMuseContract.networks[networkId];
      const deMuse = new web3.eth.Contract(
        DeMuseContract.abi,
        deMuseDeployedNetwork && deMuseDeployedNetwork.address,
      );

      const museumDeployedNetwork = TheMuseumContract.networks[networkId];
      const museum = new web3.eth.Contract(
        TheMuseumContract.abi,
        museumDeployedNetwork && museumDeployedNetwork.address,
      );
      
      const deployedNetwork = UserManagerContract.networks[networkId];
      const umInstance = new web3.eth.Contract(
        UserManagerContract.abi,
       deployedNetwork && deployedNetwork.address,
      );

      this.setState({ deMuse: deMuse, museum: museum, umInstance:umInstance, web3: web3})
      this.addEventListener(this)

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or DeMuse/Museum contracts. Check console for details.`
      );
      console.log(error);
    }
    // console.log("from Paintings:", this.state.deMuse)
    // console.log("from Paintings:", this.state.web3)
    // console.log("from Paintings:", this.state.museum)
  }

  addEventListener(component) {

    this.state.deMuse.events.MinterAdded({fromBlock: 0, toBlock: 'latest'})
    .on('data', function(event){
      // console.log(event); 
      // console.log(event.returnValues); 
    })
    .on('error', console.error);

    this.state.deMuse.events.Transfer({fromBlock: 0, toBlock: 'latest'})
    .on('data', function(event){
      // console.log("Transfer Event:",event);
      const result = event.returnValues;
      const paintingId = result.tokenId;
      const newOwner = result.to;
      //filter the painting with the id in the event
      const paintings = component.state.paintings.filter(p => p.id == paintingId );
      const painting = paintings[0];

      // component.getSomeUserInfo(newOwner).then((data) => {  
      //   console.log('Data from getSomeUserInfo: ' + data);  
      // }).catch((error) => {  
      //   console.log('Error from getSomeUserInfo(): ' + error);  
      // });
      
      const paintingArray = [...component.state.paintings];
      const index = paintingArray.indexOf(painting);
      paintingArray[index] = {...painting};
      paintingArray[index].owner = newOwner;
  
      component.setState({ paintings: paintingArray });
    })
    .on('error', console.error);

    this.state.deMuse.events.Approval({fromBlock: 0, toBlock: 'latest'})
    .on('data', function(event){
      const paintingId = event.returnValues.tokenId;
      const paintings = component.state.paintings.filter(p => p.id == paintingId );
      const painting = paintings[0];

      let msg = "User " + event.returnValues.approved + " is approved for the : " + painting.name;

      console.log( msg);

    })
    .on('error', console.error);

    this.state.museum.events.AdoptionPaintingAdded({fromBlock: 0, toBlock: 'latest'})
    .on('data', function(event){
      // console.log(event); 
      // const result = event.returnValues;
      // const paintingId = result.paintingID;
      // const newOwner = result.owner;
      // //filter the painting with the id in the event
      // const paintings = component.state.paintings.filter(p => p.id == paintingId );
      // const painting = paintings[0];

      // // component.getSomeUserInfo(newOwner).then((data) => {  
      // //   console.log('Data from getSomeUserInfo: ' + data);  
      // // }).catch((error) => {  
      // //   console.log('Error from getSomeUserInfo(): ' + error);  
      // // });
      
      // const paintingArray = [...component.state.paintings];
      // const index = paintingArray.indexOf(painting);
      // paintingArray[index] = {...painting};
      // paintingArray[index].owner = newOwner;
  
      // component.setState({ paintings: paintingArray });
           
    })
    .on('error', console.error);

  }

  // getSomeUserInfo = async(newOwner) =>{
  //   let userInfo=null;
  //   try{

  //     userInfo = await this.state.umInstance.methods.getUserInfo(newOwner).call();
  //     console.log("userInfo", userInfo);
  //   } catch(error){
  //     alert(
  //       `Failed to get User Info. Check console for details.`
  //     );
  //     console.log(error);
  //     throw new Error("Error in fetching User Info");
  //   }
  //   return userInfo;
  // }

  handleAddPainting = async(painting) => {
    try{
      let accounts = await this.state.web3.eth.getAccounts()
      await this.state.museum.methods.newPaintingForAdoption(painting.name, painting.id, painting.value).send({from: accounts[0]})
    } catch (error) {
      alert(
        `Failed to Add Painting for adoption. Check console for details.`
      );
      console.log(error);
    }
  };

  handleAdoption = async(painting) => {
    let weiValue = painting.value;
    try{
      let accounts = await this.state.web3.eth.getAccounts()
      await this.state.museum.methods.adoptionApproval(painting.id).send({from: accounts[0], value: weiValue})
      await this.state.deMuse.methods.adoptAndApproveMuseum(painting.id).send({from: accounts[0]})
    } catch (error) {
      alert(
        `Failed to adopt painting. Check console for details.`
      );
      console.log(error);
    }
  };

  handleSetOwnerName = async(painting) => {
    let name;
    try{
      let accounts = await this.state.web3.eth.getAccounts()
      name= await this.state.museum.methods.getAdoptedBy(painting.id).call({from: accounts[0]})
    } catch (error) {
      alert(
        `Failed to Add Painting for adoption. Check console for details.`
      );
      console.log(error);
    }

    const paintingArray = [...this.state.paintings];
    const index = paintingArray.indexOf(painting);
    paintingArray[index] = {...painting};
    paintingArray[index].owner = name;

    this.setState({ paintings: paintingArray });
  };

  render() {
    return (
      <div className="m-5">
        <h5>Paintings for Adoption</h5>
        <ul>
          <li style={{ color: 'grey'}}>
            <i>
              Select Account 1 in Metamask and then click on <b>Add Painting</b>
            </i>
          </li>
          <li style={{ color: 'grey'}}>
            <i>
              Select Account # in Metamask and then click on <b>Adopt</b>, to
              adopt the painting
            </i>
          </li>
          <li style={{ color: 'grey'}}>
            <i>
              Select any Account # in Metamask and then click on
              <b>Current Adopter</b>, to check who has adopted the painting
            </i>
          </li>
        </ul>
        {this.state.paintings.map(painting => (
          <Painting
            key={painting.id}
            painting={painting}
            // id={painting.id}
            // iURL={painting.iURL}
            // name={painting.name}
            // artist={painting.artist}
            // value={painting.value}
            // owner={painting.owner}
            // description={painting.description}
            onAdd={this.handleAddPainting}
            onSet={this.handleSetOwnerName}
            onAdopt={this.handleAdoption}
          />
        ))}
      </div>
    );
  }
}

export default Paintings;
