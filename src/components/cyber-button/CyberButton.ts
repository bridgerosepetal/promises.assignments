import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import styles from "./cyber-button.scss?inline";

@customElement("cyber-button")
export class CyberButton extends LitElement {
  static styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true })
  disabled = false;

  render() {
    return html`<button class="cyber-button" type="button" ?disabled=${this.disabled}>
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "cyber-button": CyberButton;
  }
}
