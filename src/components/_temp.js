// import { Component, Renderer } from "./onec.mjs";

// class Button extends Component {
//   numbers = [1, 2, 3];
//   headerText = "HEADER";
//   template = {
//     p: {
//       _id: "parent",
//       _text: () => this.headerText,
//       $click: () => this.hello("Hello World!"),
//       p: {
//         _id: "child",
//         _text: "This is beautiful",
//         $click: (event) => this.hello(event),
//         $: (fn) => this.childLoop(fn),
//       },
//     },
//     button: {
//       _text: "Hello",
//       $click: () => this.changeText(),
//     },
//   };

//   _style = "p{ color : blue }";

//   constructor() {
//     super();
//     console.log("- [Button Constructor] -");
//   }

//   hello(message) {
//     console.log("[message] -> ", message);
//   }


//   childLoop(fn) {
//     this.numbers.forEach((number) => {
//       fn({
//         p: {
//           _text: "loop child " + number,
//         },
//       });
//     });
//   }

//   changeText() {
//     this.headerText = "NEW NEW HEADER";
//   }
// }

// Renderer(Button);