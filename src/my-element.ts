import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import "./components/simple-promise/SimplePromise";
import "./components/chain-of-primises/ChainOfPromises";
import "./components/json-promise/JsonPromise";
import styles from "./my-element.scss?inline";

@customElement("my-element")
export class MyElement extends LitElement {
  static styles = unsafeCSS(styles);

  render() {
    return html`
      <div class="my-element">
        <h1>КИБЕРЗАДАЧА #550</h1>
        <h2>Практическое задание №1</h2>
        <p class="my-element__description">
          Создайте промис, который будет имитировать асинхронный запрос (например, задержку в 2
          секунды) и выполнится с успешным результатом или ошибкой.
        </p>
        <simple-promise></simple-promise>
        <hr />
        <h2>Практическое задание №2</h2>
        <p class="my-element__description">
          Создайте цепочку промисов, где каждый следующий промис будет зависеть от результата
          предыдущего.
        </p>
        <chain-of-promises></chain-of-promises>
        <hr />
        <h2>Практическое задание №3</h2>
        <div class="my-element__3">
          <p class="my-element__description">
            Создайте функцию fetchData, которая будет использовать промисы для загрузки данных с
            сервиса JSONPlaceholder. Данные должны быть получены с помощью метода GET на URL
            https://jsonplaceholder.typicode.com/posts. После получения данных обработайте их и
            выведите в консоль заголовки постов.
          </p>
          <json-promise></json-promise>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
