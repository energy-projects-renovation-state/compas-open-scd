import { html, LitElement } from 'lit-element';
import { get } from 'lit-translate';

import '../filtered-list.js';
import '../wizard-textfield.js';
import {
  newWizardEvent,
  Wizard,
} from '../foundation.js';

export default class ImportFromApiPlugin extends LitElement {
  private importFromApiWizard(): Wizard {
    return [
      {
        title: get('compas.import.title'),
        content: [
          html`<filtered-list>
          
          </filtered-list>`,
        ],
      },
    ];
  }

  async run(): Promise<void> {
    document
      .querySelector('open-scd')
      ?.dispatchEvent(newWizardEvent(this.importFromApiWizard()));
  }
}
