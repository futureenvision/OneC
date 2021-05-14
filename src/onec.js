export class Component extends HTMLElement {
  _tempTemplate = document.createElement("template");
  _templateRaw = "";
  _style = "";
  template = {};

  constructor() {
    super();
  }

  templateFactory(parentElement, objTemplate) {
    for (const key in objTemplate) {
      if (Object.hasOwnProperty.call(objTemplate, key)) {
        const value = objTemplate[key];
        if (key[0] === "_") {
          switch (key) {
            case "_text":
              console.log(typeof value);
              if (typeof value === "function") {
                parentElement.innerHTML = value();
              } else {
                parentElement.innerHTML = value;
              }
              break;
            default:
              parentElement.setAttribute(key.split("_")[1], value);
              break;
          }
        } else if (key[0] === "$") {
          if (key === "$") {
            const appendingFunction = (_objTemplate) => {
              this.templateFactory(parentElement, _objTemplate);
            };
            value(appendingFunction);
          } else {
            parentElement.addEventListener(key.split("$")[1], (event) => {
              value(event);
              event.stopPropagation();
              this.oneFactory();
            });
          }
        } else {
          const tempElement = document.createElement(key);
          parentElement.appendChild(tempElement);
          this.templateFactory(tempElement, value);
        }
      }
    }
  }

  oneFactory() {
    console.log("- [render] -");
    this._tempTemplate.innerHTML = "";
    this.shadowRoot.innerHTML = "";
    this._tempTemplate.innerHTML = `<style>${this._style}</style>${this._templateRaw}`;
    this.shadowRoot.appendChild(this._tempTemplate.content.cloneNode(true));
    this.templateFactory(this.shadowRoot, this.template);
  }
}

export const Renderer = (component) => {
  console.log(component);
  window.customElements.define(component.selector, class TmpComponent extends component.definition {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.oneFactory();
    }
  });
};

