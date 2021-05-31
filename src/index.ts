import { OneC } from "./onec";
import { RootComponent } from "./components/root/root-component";
import { CardComponent } from "./components/card/card-component";
import { CardsComponent } from "./components/cards/cards-component";
import { HeaderComponent } from "./components/header/header-component";
import { ButtonComponent } from "./components/button/button-component";

OneC([
  { selector: "c-root", definition: RootComponent },
  { selector: "c-header", definition: HeaderComponent },
  { selector: "c-button", definition: ButtonComponent },
  { selector: "c-card", definition: CardComponent },
  { selector: "c-cards", definition: CardsComponent },
]);


// import _ from "lodash";
// import Icon from "./assets/one.png";

// // Add the image to our existing div.
// const myIcon = new Image();
// myIcon.src = Icon;

// document.body.appendChild(myIcon);
