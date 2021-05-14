import { Button } from "./components/button.js";
import { Renderer } from "./onec.js";

window.addEventListener("load", function () {
  Renderer({ selector: "c-button", definition: Button });
});
