import React, { Component } from "react";

import Painting from "./painting.jsx";

class Paintings extends Component {
  state = {
    paintings: [
      {
        id: 1,
        iURL: "/The-Starry-Night-De-sterrennacht-by-Vincent-Van-Gogh.jpg",
        name: "The Starry Night (1889)",
        artist: "Vincent Van Gogh",
        description:
          "Although painted from memory, this masterpiece depicts the view outside Van Gogh’s sanitarium room window at Saint-Remy-de-Provence in France. The work shows the artist’s interest in astronomy and a study made by the Griffith Park Observatory demonstrated that Vincent represented the Moon, Venus, and several stars in the exact position they occupied that clear night. The painting is considered among the greatest works in western art and is definitely the most famous work of Vincent Van Gogh.",
        owner: ""
      },
      {
        id: 2,
        iURL: "/Vase-with-Fifteen-Sunflowers-1888-Vincent-Van-Gogh.jpg",
        name: "Vase with Fifteen Sunflowers (1888)",
        artist: "Vincent Van Gogh",
        description:
          "Vincent Van Gogh is considered a master of still life paintings and his series of paintings on ‘sunflowers’ rank among the most famous still life paintings ever created. The paintings are well known for depicting the natural beauty of the flowers and for their vibrant colors. The above painting which is titled Vase with Fifteen Sunflowers smashed the auction record for a painting when it was sold to a Japanese investor for almost $40 million in March 1987. The record was broken two years later by Van Gogh’s Irises.",
        owner: ""
      },
      {
        id: 3,
        iURL: "/Cafe-Terrace-at-Night-1888-Vincent-Van-Gogh.jpg",
        name: "Cafe Terrace at Night (1888)",
        artist: "Vincent Van Gogh",
        description:
          "Also known as The Cafe Terrace on the Place du Forum, this was the first painting in which the artist used starry background. Visitors can still stand at the northeastern corner of the Place du Forum and view the scene depicted by Van Gogh. Cafe Terrace at Night remains one of the most analyzed paintings by Van Gogh and it is debated whether it is an innovative depiction of Last Supper. There are several references to the painting in popular culture and a cafe in Croatia was redesigned to look like the cafe in the painting.",
        owner: ""
      },
      {
        id: 4,
        iURL: "/Bedroom-in-Arles-1888-Vincent-Van-Gogh.jpg",
        name: "BEDROOM IN ARLES (1888)",
        artist: "Vincent Van Gogh",
        description:
          "This painting is the first version of three similar paintings which are referred to as Bedroom in Arles and were simply titled The Bedroom by Vincent. The three paintings can be differentiated by the pictures hanging on the wall to the right. This version has miniatures of Van Gogh’s portraits of his friends Eugene Boch and Paul-Eugene Milliet on the right wall in the painting. The subject of the painting is Van Gogh’s bedroom at 2, Place Lamartine in Arles, Bouches-du-Rhone, France, famous as his Yellow House.",
        owner: ""
      }
    ]
  };
  render() {
    return (
      <div className="m-5">
        <h5>Paintings for Adoption</h5>
        <ul>
          <li>
            <i>
              Select Account 1 in Metamask and then click on <b>Add Painting</b>
            </i>
          </li>
          <li>
            <i>
              Select Account # in Metamask and then click on <b>Adopt</b>, to
              adopt the painting
            </i>
          </li>
          <li>
            <i>
              Select any Account # in Metamask and then click on
              <b>Current Adopter</b>, to check who has adopted the painting
            </i>
          </li>
        </ul>
        {this.state.paintings.map(painting => (
          <Painting
            key={painting.id}
            iURL={painting.iURL}
            name={painting.name}
            artist={painting.artist}
            description={painting.description}
            owner={Painting.description}
          />
        ))}
      </div>
    );
  }
}

export default Paintings;
