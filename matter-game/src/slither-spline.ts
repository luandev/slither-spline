import { html, LitElement } from 'lit'
import { customElement, property, query, queryAsync } from 'lit/decorators.js'
import 'bootstrap/dist/css/bootstrap.css';
import game from './game';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('slither-game')
export class SlitherGame extends LitElement {
  createRenderRoot() {
    return this;
  }

  @queryAsync('#canvas')
  canvas!: Promise<HTMLDivElement>;

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = 'World'

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0

  connectedCallback (): void {
    super.connectedCallback();
    (async () => game(await this.canvas))();
  }

  render() {
    return html`
    <div style="margin: 10px" class="card">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-sm">
              ${this.name}
            </div>
            <div class="col-sm">
              ${this.count}
            </div>
            <div class="col-sm">
              <button
                @click="${this._onClick}"
                type="button" 
                class="btn btn-primary"
              >
                Primary
              </button>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div style="margin: 10px" class="card">
      <div class="card-body">
        <div id="canvas">
        </div>
      </div>
  </div>
    `
  }

  private _onClick() {
    runEngine();
  }

  foo(): string {
    return 'foo'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slither-game': SlitherGame
  }
}
