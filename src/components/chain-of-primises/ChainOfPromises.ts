import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "./chain-of-promises.scss?inline";
import { waitDo } from "../../lib/wait-do/wait-do";

@customElement("chain-of-promises")
export class ChainOfPromises extends LitElement {
  static styles = unsafeCSS(styles);

  @state()
  isRunning = false;

  @state()
  counter: number = 0;

  render() {
    return html`
      <div class="chain-of-promises">
        <div>
          Счетчик: ${this.counter}
          <span class="chain-of-promises__status">
            ${this.isRunning ? "Цепочка промисов запущена..." : ""}
          </span>
        </div>
        <footer class="chain-of-promises__footer">
          <cyber-button @click=${this.#counter} ?disabled=${this.isRunning}>Click</cyber-button>
        </footer>
      </div>
    `;
  }

  #counter() {
    function firstFn(counter: number) {
      return new Promise<number>((resolve) => {
        waitDo(1000, () => {
          resolve(++counter);
        });
      });
    }
    function secondFn(counter: number) {
      return new Promise<number>((resolve) => {
        waitDo(1000, () => {
          resolve(++counter);
        });
      });
    }
    function thirdFn(counter: number) {
      return new Promise<number>((resolve) => {
        waitDo(1000, () => {
          resolve(++counter);
        });
      });
    }

    this.isRunning = true;
    firstFn(this.counter)
      .then((counter) => secondFn(counter))
      .then((counter) => thirdFn(counter))
      .then((counter) => {
        this.counter = counter;
        this.isRunning = false;
      });
  }
}
