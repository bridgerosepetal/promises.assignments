import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "./simple-promise.scss?inline";
import { fetchData } from "../../lib/fetch-data/fetch-data";
import "../cyber-button/CyberButton";

@customElement("simple-promise")
export class SimplePromise extends LitElement {
  static styles = unsafeCSS(styles);

  @state()
  isLoading = false;

  @state()
  inProgress = false;

  @state()
  promiseStatus = "";

  render() {
    return html`<div class="simple-promise">
      <div class="simple-promise__message">
        ${this.isLoading ? this.promiseStatus : "Нажмите на одну из кнопок, чтобы начать загрузку"}
      </div>
      <footer class="simple-promise__footer">
        <cyber-button
          ?disabled=${this.inProgress}
          @click=${() => {
            this.#clickHandler();
          }}
        >
          Выполнить команду
        </cyber-button>
        <cyber-button
          ?disabled=${this.inProgress}
          @click=${() => {
            this.#clickHandler(true);
          }}
        >
          Выполнить команду с ошибкой
        </cyber-button>
      </footer>
    </div>`;
  }

  #clickHandler(toError: boolean = false) {
    this.isLoading = true;
    this.inProgress = true;
    this.promiseStatus = "Загрузка...";
    fetchData(toError)
      .then((result) => {
        this.promiseStatus = result;
      })
      .catch((error) => {
        this.promiseStatus = error;
      })
      .finally(() => {
        this.inProgress = false;
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "simple-promise": SimplePromise;
  }
}
