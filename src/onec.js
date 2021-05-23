export class Component extends HTMLElement {
  _tempTemplate = document.createElement("template");
  _templateRaw = "";
  $style = "";
  $template = {};

  constructor() {
    super();
  }

  updateTemplate() {
    this._renderTemplate(this.shadowRoot, this.$template);
  }

  _renderTemplate(parentElement, objTemplate) {
    for (const key in objTemplate) {
      if (Object.hasOwnProperty.call(objTemplate, key)) {
        const value = objTemplate[key];
        if (key[0] === "_") {
          switch (key) {
            case "_text":
              if (typeof value === "function") {
                parentElement.innerHTML = value();
              } else {
                parentElement.innerHTML = value;
              }
              break;
            case "_style":
              let cssObject = {};
              if (typeof value === "function") {
                cssObject = value();
              } else {
                cssObject = value;
              }
              for (const cssProperty in value) {
                if (Object.hasOwnProperty.call(value, cssProperty)) {
                  const cssValue = value[cssProperty];
                  if (typeof cssValue === "function") {
                    parentElement["style"][cssProperty] = cssValue();
                  } else {
                    parentElement["style"][cssProperty] = cssValue;
                  }
                }
              }
              break;
            case "_children":
              if (value instanceof _ReactiveArray) {
                value.getArray().forEach((child) => {
                  if (child instanceof _ReactiveObject) {
                    const element = child.getObject();
                    this._renderTemplate(parentElement, element, false);
                    value.addGeneratedElements(element);
                  } else {
                    this._renderTemplate(parentElement, child, false);
                    value.addGeneratedElements(child);
                  }
                });
              } else {
                value.forEach((child) => {
                  if (child instanceof _ReactiveObject) {
                    const element = child.getObject();
                    this._renderTemplate(parentElement, element, false);
                    child.addGeneratedElement(element);
                  } else {
                    this._renderTemplate(parentElement, child, false);
                  }
                });
              }
              break;
            default:
              if (typeof value === "function") {
                parentElement.setAttribute(
                  key.substring(1, key.length),
                  value()
                );
              } else {
                parentElement.setAttribute(key.substring(1, key.length), value);
              }
              break;
          }
        } else if (key[0] === "$") {
          if (
            !objTemplate[
              `__onec_event_listener__${key.substring(1, key.length)}`
            ]
          ) {
            objTemplate[
              `__onec_event_listener__${key.substring(1, key.length)}`
            ] = true;
            parentElement.addEventListener(
              key.substring(1, key.length),
              (event) => {
                value(event);
                event.stopPropagation();
              }
            );
          }
        } else {
          if (value["__onec_element__"]) {
            this._renderTemplate(value["__onec_element__"], value);
          } else {
            const tempElement = document.createElement(key);
            parentElement.appendChild(tempElement);
            value["__onec_element__"] = tempElement;
            this._renderTemplate(tempElement, value);
          }
        }
      }
    }
  }

  oneFactory() {
    this._tempTemplate.innerHTML = "";
    this.shadowRoot.innerHTML = "";
    this._tempTemplate.innerHTML = `<style>${this.$style}</style>${this._templateRaw}`;
    this.shadowRoot.appendChild(this._tempTemplate.content.cloneNode(true));
    this._renderTemplate(this.shadowRoot, this.$template);
  }
}

// SECTION: ReactiveArray
export const ReactiveArray = (arrayFunction) => {
  return new _ReactiveArray(arrayFunction);
};
export class _ReactiveArray {
  _arrayFunction = null;
  _elements = [];

  constructor(arrayFunction) {
    this._arrayFunction = arrayFunction;
  }

  getArray() {
    this.removeGeneratedElements();
    return this._arrayFunction();
  }

  addGeneratedElements(element) {
    if (element) {
      this._elements.push(element);
    }
  }

  removeGeneratedElements() {
    this._elements.forEach((element) => {
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const elementValue = element[key];
          if (elementValue["__onec_element__"]) {
            elementValue["__onec_element__"].remove();
          } else {
            throw new Error(
              "_elements to be deleted missing __onec_element__."
            );
          }
        }
      }
    });
    this._elements = [];
  }
}

// SECTION: ReactiveObject
export const ReactiveObject = (objectFunction) => {
  return new _ReactiveObject(objectFunction);
};
export class _ReactiveObject {
  _objectFunction = null;
  _element = null;

  constructor(objectFunction) {
    this._objectFunction = objectFunction;
  }

  getObject() {
    this.removeGeneratedElement();
    return this._objectFunction();
  }

  addGeneratedElement(element) {
    this._element = element;
  }

  removeGeneratedElement() {
    for (const key in this._element) {
      if (Object.hasOwnProperty.call(this._element, key)) {
        const elementValue = this._element[key];
        if (elementValue["__onec_element__"]) {
          elementValue["__onec_element__"].remove();
        }
      }
    }
    this._element = null;
  }
}

// SECTION: Renderer
export const Renderer = (component) => {
  window.customElements.define(
    component.selector,
    class TmpComponent extends component.definition {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.oneFactory();
        this.activateVariableWatcher();
        this.lifeCycleHooks();
      }

      lifeCycleHooks() {
        new MutationObserver((mutations) => {
          if (this.OnInit) {
            this.OnInit();
          }
          this.activateAttributes();
        }).observe(document, {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: true,
        });
      }

      activateAttributes() {
        Object.getOwnPropertyNames(this).forEach((prop) => {
          if (
            prop[0] !== "$" &&
            prop.substring(0, 7) !== "_watch_" &&
            prop !== "_tempTemplate" &&
            prop !== "_templateRaw" &&
            prop === "_txt"
          ) {
            const attributeValue = this.getAttribute(
              prop.substring(1, prop.length)
            );
            if (attributeValue) {
              this[prop] = attributeValue;
            }
            this.updateTemplate();

            // NOTE: requires optimization [issue: loops twice on [mutations.forEach]]
            new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                  const attributeValue = this.getAttribute(
                    prop.substring(1, prop.length)
                  );
                  if (attributeValue) {
                    this[prop] = attributeValue;
                  }
                  this.updateTemplate();
                }
              });
            }).observe(this, {
              attributes: true,
            });
          }
        });
      }

      activateVariableWatcher() {
        Object.getOwnPropertyNames(this).forEach((prop) => {
          const value = this[prop];
          if (prop[0] !== "_" && prop[0] !== "$") {
            if (typeof value === "object") {
              this.activateVariableProxy(prop, value);
            } else {
              this.activateVariablePrimitives(prop, value);
            }
          }
        });
      }

      activateVariablePrimitives(prop, value) {
        if (
          this[`_watch_${prop}`] ||
          this[`_watch_${prop}`] === 0 ||
          this[`_watch_${prop}`] === false
        ) {
          throw new Error(
            `watcher can not activate on ${prop} because _${prop} exists`
          );
        }
        this[`_watch_${prop}`] = value;
        Object.defineProperty(this, prop, {
          get() {
            return this[`_watch_${prop}`];
          },

          set(value) {
            this[`_watch_${prop}`] = value;
            this.updateTemplate();
          },
        });
      }

      activateVariableProxy(prop, value) {
        this[`_watch_${prop}`] = value;
        const validator = {
          get(target, key) {
            if (typeof target[key] === "object" && target[key] !== null) {
              return new Proxy(target[key], validator);
            } else {
              return target[key];
            }
          },
          set: (target, prop, receiver) => {
            target[prop] = receiver;
            this.updateTemplate();
            return true;
          },
        };
        this[`${prop}`] = new Proxy(this[`_watch_${prop}`], validator);
      }
    }
  );
};

export const OneC = (components) => {
  components.forEach((component) => {
    Renderer(component);
  });
};
