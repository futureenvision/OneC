import { OneC } from "./onec";
import { CardComponent } from "./components/card/card-component";
import { CardsComponent } from "./components/cards/cards-component";

OneC([
  { selector: "c-card", definition: CardComponent },
  { selector: "c-cards", definition: CardsComponent },
]);
