// SECTION: Component
export class Component extends HTMLElement {
  public $style: string = "";
  public $template: any = {};
  private templateRaw = "";
  private template: HTMLElement | any = document.createElement("template");

  constructor() {
    super();
  }

  public updateTemplate() {
    // TODO: benchmark refresh process
    // console.log("[updateTemplate]");
    this.renderTemplate(
      <HTMLElement>(<unknown>this.shadowRoot),
      this.$template
    );
  }

  private renderTemplate(parentElement: HTMLElement, objTemplate: any) {
    if (parentElement && objTemplate) {
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
                for (const cssProperty in cssObject) {
                  if (Object.hasOwnProperty.call(value, cssProperty)) {
                    const cssValue = value[cssProperty];
                    if (typeof cssValue === "function") {
                      parentElement.style.setProperty(cssProperty, cssValue());
                    } else {
                      parentElement.style.setProperty(cssProperty, cssValue);
                    }
                  }
                }
                break;
              case "_cn":
                if (value instanceof ReactiveList) {
                  const children = value.getArray();
                  if (children) {
                    children.forEach((child: ReactiveObject) => {
                      if (child instanceof ReactiveObject) {
                        const element = child.getObject();
                        this.renderTemplate(parentElement, element);
                        value.addGeneratedElements(element);
                      } else {
                        this.renderTemplate(parentElement, child);
                        value.addGeneratedElements(child);
                      }
                    });
                  }
                } else {
                  value.forEach((child: ReactiveObject) => {
                    if (child instanceof ReactiveObject) {
                      const element = child.getObject();
                      this.renderTemplate(parentElement, element);
                      child.addGeneratedElement(element);
                    } else {
                      this.renderTemplate(parentElement, child);
                    }
                  });
                }
                break;
              default:
                if (value instanceof BindObject) {
                  parentElement.setAttribute(
                    key.substring(1, key.length),
                    value.getCurrentState()
                  );
                  value.addListener(
                    parentElement,
                    key.substring(1, key.length)
                  );
                } else {
                  parentElement.setAttribute(
                    key.substring(1, key.length),
                    value
                  );
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
                  this.updateTemplate();
                }
              );
            }
          } else {
            if (value["__onec_element__"]) {
              this.renderTemplate(value["__onec_element__"], value);
            } else {
              const tempElement = document.createElement(key);
              parentElement.appendChild(tempElement);
              value["__onec_element__"] = tempElement;
              this.renderTemplate(tempElement, value);
            }
          }
        }
      }
    }
  }

  private oneFactory() {
    if (this.template && this.shadowRoot) {
      this.template.innerHTML = "";
      this.shadowRoot.innerHTML = "";
      this.template.innerHTML = `<style>${this.$style}</style>${this.templateRaw}`;
      this.shadowRoot.appendChild(this.template.content.cloneNode(true));
    }
    this.renderTemplate(
      <HTMLElement>(<unknown>this.shadowRoot),
      this.$template
    );
  }
}

// SECTION: ReactiveArray
export const ReactiveLst = (
  functionsList: (value: Array<any>) => void
): ReactiveList => {
  return new ReactiveList(functionsList);
};

export class ReactiveList {
  private functionsList!: (value: Array<any>) => void;
  private elements: Array<HTMLElement> = [];
  private elementsList: Array<any> = [];

  constructor(functionsList: (value: Array<any>) => void) {
    this.functionsList = functionsList;
  }

  public getArray(): Array<any | ReactiveObject> {
    this.elementsList = [];
    this.removeGeneratedElements();
    this.functionsList(this.elementsList);
    return this.elementsList;
  }

  public addGeneratedElements(element: any): void {
    if (element) this.elements.push(element);
  }

  private removeGeneratedElements(): void {
    this.elements.forEach((element: HTMLElement | any) => {
      for (const key in element) {
        if (Object.hasOwnProperty.call(element, key)) {
          const elementValue = element[key];
          if (elementValue["__onec_element__"]) {
            elementValue["__onec_element__"].remove();
          } else {
            throw new Error("elements to be deleted missing __onec_element__.");
          }
        }
      }
    });
    this.elements = [];
  }
}

// SECTION: ReactiveObject
export const ReactiveObj = (
  functionObject: (value: ElementObject) => void
): ReactiveObject => {
  return new ReactiveObject(functionObject);
};

class ElementObject {
  public element!: any;

  set(element: any) {
    this.element = element;
  }

  get() {
    return this.element;
  }
}

export class ReactiveObject {
  private functionObject!: (value: ElementObject) => void;
  private element!: HTMLElement | any;

  constructor(functionObject: (value: ElementObject) => void) {
    this.functionObject = functionObject;
  }

  getObject() {
    let elementObject = new ElementObject();
    this.removeGeneratedElement();
    this.functionObject(elementObject);
    return elementObject.get();
  }

  addGeneratedElement(element: HTMLElement) {
    this.element = element;
  }

  removeGeneratedElement() {
    for (const key in this.element) {
      if (Object.hasOwnProperty.call(this.element, key)) {
        const elementValue = this.element[key];
        if (elementValue["__onec_element__"]) {
          elementValue["__onec_element__"].remove();
        }
      }
    }
    this.element = null;
  }
}

// SECTION: Renderer
export interface IComponent {
  selector: string;
  definition: CustomElementConstructor | any;
}

export const OneC = (components: Array<IComponent>) => {
  components.forEach((component) => {
    Renderer(component);
  });
};

export const Renderer = (component: IComponent) => {
  window.customElements.define(
    component.selector,
    <any>class TmpComponent extends component.definition {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.oneFactory();
        this.activateVariableWatcher();
        this.lifeCycleHooks();
      }

      private lifeCycleHooks() {
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

      private activateAttributes() {
        Object.getOwnPropertyNames(this).forEach((prop) => {
          if (
            prop[0] !== "$" &&
            prop.substring(0, 7) !== "_watch_" &&
            prop !== "template" &&
            prop !== "templateRaw" &&
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
            }).observe(<any>this, {
              attributes: true,
            });
          }
        });
      }

      private activateVariableWatcher() {
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

      private activateVariablePrimitives(prop: string, value: any) {
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

      private activateVariableProxy(prop: string, value: any) {
        this[`_watch_${prop}`] = value;
        const validator = {
          get(target: any, key: any): any {
            if (typeof target[key] === "object" && target[key] !== null) {
              return new Proxy(target[key], validator);
            } else {
              return target[key];
            }
          },
          set: (target: any, prop: any, receiver: any) => {
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

// SECTION: Store
export class Store {
  private bindingFunctions: Array<(state: Store) => void> = [];

  constructor() {}

  bind(bindingFunction: (state: any) => void) {
    if (bindingFunction) {
      this.bindingFunctions.push(bindingFunction);
      if (this.bindingFunctions.length === 1) {
        this._activateVariableWatcher();
        this._updateBindings();
      }
    }
  }

  _updateBindings() {
    for (const bindingFunction of this.bindingFunctions) {
      bindingFunction(this);
    }
  }

  _activateVariableWatcher() {
    Object.getOwnPropertyNames(this).forEach((prop: any) => {
      const value = this[prop as keyof Store];
      if (prop[0] !== "_" && prop[0] !== "$") {
        if (typeof value === "object") {
          this._activateVariableProxy(prop, value);
        } else {
          this._activateVariablePrimitives(prop, value);
        }
      }
    });
  }

  _activateVariablePrimitives(prop: string, value: any) {
    const variable = this[`_watch_${prop}` as keyof Store];
    if (variable || variable === 0 || variable === false) {
      throw new Error(
        `watcher can not activate on ${prop} because _${prop} exists`
      );
    } 
    this[`_watch_${prop}` as keyof Store] = value;
    Object.defineProperty(this, prop, {
      get() {
        return this[`_watch_${prop}`];
      },

      set(value) {
        this[`_watch_${prop}`] = value;
        this._updateBindings();
      },
    });
  }

  _activateVariableProxy(prop: string, value: any) {
    this[`_watch_${prop}` as keyof Store] = value;
    const validator = {
      get(target: any, key: any): any {
        if (typeof target[key] === "object" && target[key] !== null) {
          return new Proxy(target[key], validator);
        } else {
          return target[key];
        }
      },
      set: (target: any, prop: any, receiver: any) => {
        target[prop] = receiver;
        this._updateBindings();
        return true;
      },
    };
    this[`${prop}` as keyof Store] = new Proxy(
      this[`_watch_${prop}` as keyof Store],
      validator
    );
  }
}

class BindObject {
  private element!: HTMLElement;
  private currentState!: string;
  private onChange!: (value: string) => {};

  constructor(initState: string, onChange: (value: string) => {}) {
    this.onChange = onChange;
    this.currentState = initState;
  }

  public addListener(element: HTMLElement, property: string): void {
    if (element) {
      if (!this.element) {
        this.element = element;
        element.addEventListener("keyup", () => {
          const value = element.getAttribute(property);
          if (value) {
            this.onChange(value);
            this.currentState = value;
          }
        });
      }
    }
  }

  public getCurrentState(): string {
    return this.currentState;
  }
}

export const Bind = (
  initState: string,
  onChange: (value: string) => {}
): BindObject => {
  return new BindObject(initState, onChange);
};
