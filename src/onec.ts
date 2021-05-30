// SECTION: Component

type IAnonymous = () => string | number | null | undefined | void;

export interface ITemplate {
  a?: IElement;
  b?: IElement;
  u?: IElement;
  p?: IElement;
  i?: IElement;
  s?: IElement;
  q?: IElement;
  rb?: IElement;
  rp?: IElement;
  rt?: IElement;
  em?: IElement;
  h1?: IElement;
  h2?: IElement;
  h3?: IElement;
  h4?: IElement;
  h5?: IElement;
  h6?: IElement;
  hr?: IElement;
  li?: IElement;
  ul?: IElement;
  ol?: IElement;
  dl?: IElement;
  dt?: IElement;
  dd?: IElement;
  br?: IElement;
  tr?: IElement;
  th?: IElement;
  td?: IElement;
  dfn?: IElement;
  bdo?: IElement;
  bdi?: IElement;
  sub?: IElement;
  col?: IElement;
  sup?: IElement;
  svg?: IElement;
  map?: IElement;
  ins?: IElement;
  del?: IElement;
  rtc?: IElement;
  kbd?: IElement;
  pre?: IElement;
  img?: IElement;
  var?: IElement;
  wbr?: IElement;
  nav?: IElement;
  div?: IElement;
  cite?: IElement;
  menu?: IElement;
  slot?: IElement;
  form?: IElement;
  math?: IElement;
  area?: IElement;
  abbr?: IElement;
  code?: IElement;
  data?: IElement;
  main?: IElement;
  time?: IElement;
  html?: IElement;
  base?: IElement;
  head?: IElement;
  link?: IElement;
  body?: IElement;
  meta?: IElement;
  ruby?: IElement;
  mark?: IElement;
  samp?: IElement;
  span?: IElement;
  title?: IElement;
  style?: IElement;
  aside?: IElement;
  tbody?: IElement;
  tfoot?: IElement;
  table?: IElement;
  thead?: IElement;
  meter?: IElement;
  input?: IElement;
  audio?: IElement;
  track?: IElement;
  param?: IElement;
  video?: IElement;
  embed?: IElement;
  label?: IElement;
  small?: IElement;
  strong?: IElement;
  button?: IElement;
  legend?: IElement;
  option?: IElement;
  output?: IElement;
  footer?: IElement;
  figure?: IElement;
  iframe?: IElement;
  object?: IElement;
  portal?: IElement;
  source?: IElement;
  canvas?: IElement;
  script?: IElement;
  header?: IElement;
  select?: IElement;
  dialog?: IElement;
  summary?: IElement;
  address?: IElement;
  details?: IElement;
  picture?: IElement;
  caption?: IElement;
  section?: IElement;
  article?: IElement;
  noscript?: IElement;
  fieldset?: IElement;
  datalist?: IElement;
  colgroup?: IElement;
  optgroup?: IElement;
  textarea?: IElement;
  progress?: IElement;
  template?: IElement;
  figcaption?: IElement;
  blockquote?: IElement;
}

export interface IElement {
  _id?: string | IAnonymous;
  _src?: string | IAnonymous;
  _text?: string | IAnonymous;
  _style?: string | IAnonymous;
  _class?: string | IAnonymous;
  $click?: IAnonymous;
  $afterscriptexecute?: IAnonymous;
  $auxclick?: IAnonymous;
  $beforescriptexecute?: IAnonymous;
  $blur?: IAnonymous;
  $compositionend?: IAnonymous;
  $compositionstart?: IAnonymous;
  $compositionupdate?: IAnonymous;
  $contextmenu?: IAnonymous;
  $copy?: IAnonymous;
  $cut?: IAnonymous;
  $dblclick?: IAnonymous;
  $DOMActivate?: IAnonymous;
  $DOMMouseScroll?: IAnonymous;
  $error?: IAnonymous;
  $focusin?: IAnonymous;
  $focusout?: IAnonymous;
  $focus?: IAnonymous;
  $fullscreenchange?: IAnonymous;
  $fullscreenerror?: IAnonymous;
  $gesturechange?: IAnonymous;
  $gestureend?: IAnonymous;
  $gesturestart?: IAnonymous;
  $keydown?: IAnonymous;
  $keypress?: IAnonymous;
  $keyup?: IAnonymous;
  $mousedown?: IAnonymous;
  $mouseenter?: IAnonymous;
  $mouseleave?: IAnonymous;
  $mousemove?: IAnonymous;
  $mouseout?: IAnonymous;
  $mouseover?: IAnonymous;
  $mouseup?: IAnonymous;
  $mousewheel?: IAnonymous;
  $msContentZoom?: IAnonymous;
  $MSGestureChange?: IAnonymous;
  $MSGestureEnd?: IAnonymous;
  $MSGestureHold?: IAnonymous;
  $MSGestureStart?: IAnonymous;
  $MSGestureTap?: IAnonymous;
  $MSInertiaStart?: IAnonymous;
  $MSManipulationStateChanged?: IAnonymous;
  $overflow?: IAnonymous;
  $paste?: IAnonymous;
  $scroll?: IAnonymous;
  $select?: IAnonymous;
  $show?: IAnonymous;
  $touchcancel?: IAnonymous;
  $touchend?: IAnonymous;
  $touchmove?: IAnonymous;
  $touchstart?: IAnonymous;
  $underflow?: IAnonymous;
  $webkitmouseforcechanged?: IAnonymous;
  $webkitmouseforcedown?: IAnonymous;
  $webkitmouseforceup?: IAnonymous;
  $webkitmouseforcewillbegin?: IAnonymous;
  $wheel?: IAnonymous;
  _cn?: Array<ITemplate | ReactiveObject> | ReactiveList;
}

/**
 * A OneC component template to creating a WebComponent.
 */
export class OneComponent extends HTMLElement {
  public $style: string = "";
  public $template: any = {};
  private templateRaw = "";
  private template: HTMLElement | any = document.createElement("template");

  /**
   * Represents a OneC component to used for creating a WebComponent.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * This function is used to force update the template of the component.
   */
  public updateTemplate(): void {
    this.renderTemplate(
      <HTMLElement>(<unknown>this.shadowRoot),
      this.$template
    );
  }

  /**
   * This function is used to render the template of the component.
   * @param {HTMLElement} parentElement - The parent element where a child element will be created or an attribute, function are applied.
   * @param {any} objTemplate - A json object containing the elements, attributes and functions to be rendered to the template.
   */
  private renderTemplate(parentElement: HTMLElement, objTemplate: any): void {
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
                  const children = value.getList();
                  if (children) {
                    children.forEach((child: ReactiveObject) => {
                      if (child instanceof ReactiveObject) {
                        const element = child.getObject();
                        this.renderTemplate(parentElement, element);
                        value.addGeneratedElement(element);
                      } else {
                        this.renderTemplate(parentElement, child);
                        value.addGeneratedElement(child);
                      }
                    });
                  }
                } else {
                  console.log("[children] -> ", value);

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
    } else {
      throw new Error("parent element or object template not found.");
    }
  }

  /**
   * This function is apply the template to the shadow root. (made use by the OneCRenderer function)
   */
  private oneFactory(): void {
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

// SECTION: Renderer
export interface IComponent {
  selector: string;
  definition: CustomElementConstructor | any;
}

/**
 * This function is used to render all the application components so there are accessible as WebComponents.
 * @param {Array<IComponent>} components - A list of the components to be made into WebComponents.
 */
export const OneC = (components: Array<IComponent>): void => {
  components.forEach((component) => {
    OneCRenderer(component);
  });
};

/**
 * This function is used to render a component so that it is accessible as a WebComponent.
 * @param {IComponent} component - A component to be made into WebComponent.
 */
export const OneCRenderer = (component: IComponent): void => {
  window.customElements.define(
    component.selector,
    /**
     * A generic template to create a WebComponent. (Responsible for setup the ShadowRoot, Factory, VariableWatchers and lifeCycleHooks)
     */
    <any>class TmpComponent extends component.definition {
      /**
       * Represents a component class to be used for creating a WebComponent.
       * @constructor
       */
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.oneFactory();
        this.activateVariableWatchers();
        this.lifeCycleHooks();
      }

      /**
       * The series of changes in the life of a component.
       */
      private lifeCycleHooks(): void {
        // TODO: fix lifeCycleHooks
        new MutationObserver((mutations) => {
          if (this.OnInit) {
            this.OnInit();
          }
        }).observe(document, {
          attributes: false,
          childList: true,
          characterData: false,
          subtree: true,
        });
        this.activateAttributeWatchers();
      }

      /**
       * Creates MutationObserver to observer changes on the component attributes.
       */
      private activateAttributeWatchers(): void {
        Object.getOwnPropertyNames(this).forEach((prop) => {
          if (
            prop[0] !== "$" &&
            prop.substring(0, 7) !== "_watch_" &&
            prop !== "template" &&
            prop !== "templateRaw" &&
            prop !== "_text"
          ) {
            const attributeValue = this.getAttribute(
              prop.substring(1, prop.length)
            );
            if (attributeValue) {
              if (typeof attributeValue === "function") {
                this[prop] = attributeValue();
              } else {
                this[prop] = attributeValue;
              }
            }
            this.updateTemplate();

            // TODO: requires optimization. (issue: loops twice on [mutations.forEach])
            new MutationObserver((mutations) => {
              mutations.forEach((mutation) => {
                if (mutation.type == "attributes") {
                  const attributeValue = this.getAttribute(
                    prop.substring(1, prop.length)
                  );
                  if (attributeValue) {
                    if (typeof attributeValue === "function") {
                      this[prop] = attributeValue();
                    } else {
                      this[prop] = attributeValue;
                    }
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

      /**
       * Creates Proxy or Getter Setters to observer changes on the component class variable.
       */
      private activateVariableWatchers(): void {
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

      /**
       * Creates Getter Setters to observer changes on the component class variable.
       * @param {string} prop - A property name to a variable.
       * @param {any} value - A variable value.
       */
      private activateVariablePrimitives(prop: string, value: any): void {
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

      /**
       * Creates Proxy to observer changes on the component class variable.
       * @param {string} prop - A property name to a variable.
       * @param {any} value - A variable value.
       */
      private activateVariableProxy(prop: string, value: any): void {
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

// SECTION: ReactiveArray

/**
 * This function is used to reactively render a list of objects. (to be used with element children)
 * @param {(list: Array<any | ReactiveObject>) => void} list - A anonymous function that provides a list to add the reactive/static objects definitions.
 * @return {ReactiveList} A Object used to reactively render a list of reactive/static objects.
 */
export const ReactiveLst = (
  functionsList: (list: Array<any | ReactiveObject>) => void
): ReactiveList => {
  return new ReactiveList(functionsList);
};

/**
 * A Object used to reactively render a list of reactive/static objects.
 */
class ReactiveList {
  private functionsList!: (list: Array<any | ReactiveObject>) => void;
  private elements: Array<HTMLElement> = [];
  private elementsList: Array<any> = [];

  /**
   * Represents a object to reactively render a list of reactive/static objects..
   * @constructor
   * @param {(list: Array<any | ReactiveObject>) => void} list - A anonymous function that provides a list to add the reactive/static objects definitions.
   */
  constructor(functionsList: (list: Array<any | ReactiveObject>) => void) {
    this.functionsList = functionsList;
  }

  /**
   * This function is used to get the list of reactive/static objects
   */
  public getList(): Array<any | ReactiveObject> {
    this.elementsList = [];
    this.removeGeneratedElements();
    this.functionsList(this.elementsList);
    return this.elementsList;
  }

  /**
   * This function is used to add a generated element to a list of elements pending deletion upon refreshing the ReactiveList.
   * @param {HTMLElement} element - An element scheduled for deletion upon ReactiveList refresh.
   */
  public addGeneratedElement(element: HTMLElement): void {
    if (element) this.elements.push(element);
  }

  /**
   * This function is used to delete elements upon refreshing the ReactiveList.
   */
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
/**
 * This function is used to reactively render a objects.
 * @param {(list: Array<any | ReactiveObject>) => void} list - A anonymous function that provides a list to add the reactive/static objects definitions.
 * @return {ReactiveObject} A Object used to reactively render a reactive/static objects.
 */
export const ReactiveObj = (
  functionObject: (obj: ElementObject) => void
): ReactiveObject => {
  return new ReactiveObject(functionObject);
};

/**
 * A generic object used to get and set a value.
 */
class ElementObject {
  public element!: any;

  /**
   * This function is used to set a element.
   * @param {any} element - generic object
   */
  set(element: any) {
    this.element = element;
  }

  /**
   * This function is used to get a element.
   */
  get() {
    return this.element;
  }
}

/**
 * A Object used to reactively render a reactive/static objects.
 */
class ReactiveObject {
  private functionObject!: (obj: ElementObject) => void;
  private element!: HTMLElement | any;

  /**
   * Represents a object to reactively render a reactive/static objects..
   * @constructor
   * @param {(obj: ElementObject) => void} list - A anonymous function that provides a ElementObject to set a reactive/static objects.
   */
  constructor(functionObject: (obj: ElementObject) => void) {
    this.functionObject = functionObject;
  }

  /**
   * This function is used to get the reactive/static objects
   */
  getObject() {
    let elementObject = new ElementObject();
    this.removeGeneratedElement();
    this.functionObject(elementObject);
    return elementObject.get();
  }

  /**
   * This function is used to assign a generated element pending deletion upon refreshing the ReactiveObject.
   * @param {HTMLElement} element - An element scheduled for deletion upon ReactiveObject refresh.
   */
  addGeneratedElement(element: HTMLElement) {
    this.element = element;
  }

  /**
   * This function is used to delete the generated element upon refreshing the ReactiveObject.
   */
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

// SECTION: OneCStore
/**
 * A OneC Store template.
 */
export class OneCStore {
  private bindingFunctions: Array<(state: OneCStore) => void> = [];

  /**
   * Represents a OneC Store.
   * @constructor
   */
  constructor() {}

  /**
   * This function is used to add a anonymous function using to bind the Store with a component.
   */
  public bind(bindingFunction: (state: any) => void): void {
    if (bindingFunction) {
      this.bindingFunctions.push(bindingFunction);
      if (this.bindingFunctions.length === 1) {
        this.activateVariableWatcher();
        this.updateBindings();
      }
    }
  }

  /**
   * This function is used to rerun the binding functions.
   */
  private updateBindings(): void {
    for (const bindingFunction of this.bindingFunctions) {
      bindingFunction(this);
    }
  }

  /**
   * Creates Proxy or Getter Setters to observer changes on the store class variable.
   */
  private activateVariableWatcher(): void {
    Object.getOwnPropertyNames(this).forEach((prop: any) => {
      const value = this[prop as keyof OneCStore];
      if (prop[0] !== "_" && prop[0] !== "$") {
        if (typeof value === "object") {
          this.activateVariableProxy(prop, value);
        } else {
          this.activateVariablePrimitives(prop, value);
        }
      }
    });
  }

  /**
   * Creates Getter Setters to observer changes on the store class variable.
   * @param {string} prop - A property name to a variable.
   * @param {any} value - A variable value.
   */
  private activateVariablePrimitives(prop: string, value: any): void {
    const variable = this[`_watch_${prop}` as keyof OneCStore];
    if (variable || variable === 0 || variable === false) {
      throw new Error(
        `watcher can not activate on ${prop} because _${prop} exists`
      );
    }
    this[`_watch_${prop}` as keyof OneCStore] = value;
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

  /**
   * Creates Proxy to observer changes on the store class variable.
   * @param {string} prop - A property name to a variable.
   * @param {any} value - A variable value.
   */
  private activateVariableProxy(prop: string, value: any): void {
    this[`_watch_${prop}` as keyof OneCStore] = value;
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
        this.updateBindings();
        return true;
      },
    };
    this[`${prop}` as keyof OneCStore] = new Proxy(
      this[`_watch_${prop}` as keyof OneCStore],
      validator
    );
  }
}

// SECTION: BindObject
/**
 * This function is used to two-way bind a local variable and the element value.
 * @param {string} initState - The initial value for the element value.
 * @param {(value: string) => void} onChange - A anonymous function that provides an update value upon keyup changes.
 * @return {BindObject} A two-way binding object.
 */
export const Bind = (
  initState: string,
  onChange: (value: string) => void
): BindObject => {
  return new BindObject(initState, onChange);
};

/**
 * A two-way binding object.
 */
class BindObject {
  private element!: HTMLElement;
  private currentState!: string;
  private onChange!: (value: string) => void;

  /**
   * Represents a two-way binding object.
   * @constructor
   * @param {string} initState - The initial value for the element value.
   * @param {(value: string) => void} onChange - A anonymous function that provides an update value upon keyup changes.
   */
  constructor(initState: string, onChange: (value: string) => void) {
    this.onChange = onChange;
    this.currentState = initState;
  }

  /**
   * This function is used to add an "keyup" event listener to the respective element.
   * @param {HTMLElement} element - The element to attach a event listener.
   * @param {string} property - The element property to retrieve upon event listener trigger.
   */
  public addListener(element: HTMLElement | any, property: string): void {
    if (element) {
      if (!this.element) {
        this.element = element;
        element.addEventListener("keyup", () => {
          const value = element[property];
          if (value) {
            this.onChange(value);
            this.currentState = value;
          }
        });
      }
    }
  }

  /**
   * This function is used to retrieve the current state of the bind.
   * @return {string} current state of the bind.
   */
  public getCurrentState(): string {
    return this.currentState;
  }
}
