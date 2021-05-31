import { OneC } from "./onec";
import { RootComponent } from "./components/root/root-component";
import { CardComponent } from "./components/card/card-component";
import { CardsComponent } from "./components/cards/cards-component";
import { HeaderComponent } from "./components/header/header-component";

OneC([
  { selector: "c-root", definition: RootComponent },
  { selector: "c-header", definition: HeaderComponent },
  { selector: "c-card", definition: CardComponent },
  { selector: "c-cards", definition: CardsComponent },
]);
