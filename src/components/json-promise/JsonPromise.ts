import { LitElement, html, unsafeCSS } from "lit";
import { customElement, state } from "lit/decorators.js";
import styles from "./json-promise.scss?inline";
import { fetchData2 } from "../../lib/fetch-data2/fetch-data2";
import { waitDo } from "../../lib/wait-do/wait-do";

@customElement("json-promise")
export class JsonPromise extends LitElement {
  static styles = unsafeCSS(styles);

  @state()
  status = "Нанжмите на кнопку, чтобы запустить";

  @state()
  inProgress = false;

  render() {
    return html`<div class="json-promise">
      <div class="json-promise__status">${this.status}</div>
      <footer class="json-promise__footer">
        <cyber-button @click=${this.#fetch} ?disabled=${this.inProgress}>Запустить</cyber-button>
      </footer>
    </div>`;
  }

  #fetch() {
    this.inProgress = true;
    this.status = "Загрузка...";
    fetchData2()
      .then(() => {
        this.status = "Готово. Проверьте консоль браузера.";
      })
      .catch((error) => {
        this.status = `Произошла ошибка ${error.message}`;
      })
      .finally(() => {
        waitDo(4000, () => {
          this.status = "Нажмите на кнопку, чтобы запустить заново";
          this.inProgress = false;
        });
      });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "json-promise": JsonPromise;
  }
}
