import { LitElement, html, TemplateResult, property, css } from 'lit-element';
import { translate } from 'lit-translate';

import {
  getReference,
  identity,
  newActionEvent,
  newWizardEvent,
} from '../foundation.js';

import { styles } from './templates/foundation.js';

import '../filtered-list.js';
import './templates/enum-type-editor.js';
import {
  createDATypeWizard,
  dATypeWizard,
} from './templates/datype-wizards.js';

import {
  createDOTypeWizard,
  dOTypeWizard,
} from './templates/dotype-wizards.js';

import { EnumTypeEditor } from './templates/enum-type-editor.js';
import { List } from '@material/mwc-list';
import { ListItem } from '@material/mwc-list/mwc-list-item';
import { SingleSelectedEvent } from '@material/mwc-list/mwc-list-foundation';

const templates = fetch('public/xml/templates.scd')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, 'application/xml'));

/** An editor [[`plugin`]] for editing the `DataTypeTemplates` section. */
export default class TemplatesPlugin extends LitElement {
  /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
  @property()
  doc!: XMLDocument;

  async openCreateDOTypeWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        createDOTypeWizard(
          this.doc.querySelector(':root > DataTypeTemplates')!,
          await templates
        )
      )
    );
  }

  openDOTypeWizard(identity: string): void {
    const wizard = dOTypeWizard(identity, this.doc);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  openDATypeWizard(identity: string): void {
    const wizard = dATypeWizard(identity, this.doc);
    if (wizard) this.dispatchEvent(newWizardEvent(wizard));
  }

  async openCreateDATypeWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        createDATypeWizard(
          this.doc.querySelector(':root > DataTypeTemplates')!,
          await templates
        )
      )
    );
  }

  async openCreateEnumWizard(): Promise<void> {
    this.createDataTypeTemplates();

    this.dispatchEvent(
      newWizardEvent(
        EnumTypeEditor.wizard({
          parent: this.doc.querySelector(':root > DataTypeTemplates')!,
          templates: await templates,
        })
      )
    );
  }

  createDataTypeTemplates(): void {
    if (!this.doc.querySelector(':root > DataTypeTemplates'))
      this.dispatchEvent(
        newActionEvent({
          new: {
            parent: this.doc.documentElement,
            element: this.doc.createElement('DataTypeTemplates'),
            reference: getReference(
              this.doc.documentElement,
              'DataTypeTemplates'
            ),
          },
        })
      );
  }

  render(): TemplateResult {
    if (!this.doc?.querySelector(':root > DataTypeTemplates'))
      return html`<h1>
        <span style="color: var(--base1)"
          >${translate('templates.missing')}</span
        >
        <mwc-fab
          extended
          icon="add"
          label="${translate('templates.add')}"
          @click=${() => this.createDataTypeTemplates()}
        ></mwc-fab>
      </h1>`;
    return html`
      <div id="containerTemplates">
        <section tabindex="0">
          <h1>
            ${translate('scl.LNodeType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button icon="playlist_add"></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <filtered-list id="lnodetype">
            ${Array.from(
              this.doc.querySelectorAll(
                ':root > DataTypeTemplates > LNodeType'
              ) ?? []
            ).map(
              lnodetype =>
                html`<mwc-list-item
              twoline
              value="${identity(lnodetype)}"
              tabindex="0"
              hasMeta
              ><span>${lnodetype.getAttribute('id')}</span
              ><span slot="secondary">${lnodetype.getAttribute(
                'lnClass'
              )}</span></span><span slot="meta"
                >${lnodetype.querySelectorAll('DO').length}</span
              ></mwc-list-item
            >`
            )}
          </filtered-list>
        </section>
        <section tabindex="0">
          <h1>
            ${translate('scl.DOType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button
                  icon="playlist_add"
                  @click=${() => this.openCreateDOTypeWizard()}
                ></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <filtered-list
            id="dotypelist"
            @selected=${(e: SingleSelectedEvent) =>
              this.openDOTypeWizard(
                (<ListItem>(<List>e.target).selected).value
              )}
          >
            ${Array.from(
              this.doc.querySelectorAll(':root > DataTypeTemplates > DOType') ??
                []
            ).map(
              dotype =>
                html`<mwc-list-item
                  twoline
                  value="${identity(dotype)}"
                  tabindex="0"
                  hasMeta
                  ><span>${dotype.getAttribute('id')}</span
                  ><span slot="secondary">${dotype.getAttribute(
                    'cdc'
                  )}</span></span><span slot="meta"
                    >${dotype.querySelectorAll('SDO, DA').length}</span
                  ></mwc-list-item
                >`
            )}
          </filtered-list>
        </section>
        <section tabindex="0">
          <h1>
            ${translate('scl.DAType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button
                  icon="playlist_add"
                  @click=${() => this.openCreateDATypeWizard()}
                ></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <filtered-list
            id="datypelist"
            @selected=${(e: SingleSelectedEvent) =>
              this.openDATypeWizard(
                (<ListItem>(<List>e.target).selected).value
              )}
          >
            ${Array.from(
              this.doc.querySelectorAll(':root > DataTypeTemplates > DAType') ??
                []
            ).map(
              datype =>
                html`<mwc-list-item
                  value="${identity(datype)}"
                  tabindex="0"
                  hasMeta
                  ><span>${datype.getAttribute('id')}</span
                  ><span slot="meta"
                    >${datype.querySelectorAll('BDA').length}</span
                  ></mwc-list-item
                >`
            )}
          </filtered-list>
        </section>
        <section tabindex="0">
          <h1>
            ${translate('scl.EnumType')}
            <nav>
              <abbr title="${translate('add')}">
                <mwc-icon-button
                  icon="playlist_add"
                  @click=${() => this.openCreateEnumWizard()}
                ></mwc-icon-button>
              </abbr>
            </nav>
          </h1>
          <mwc-list>
            ${Array.from(
              this.doc.querySelectorAll(
                ':root > DataTypeTemplates > EnumType'
              ) ?? []
            ).map(
              enumType =>
                html`<enum-type-editor .element=${enumType}></enum-type-editor>`
            )}
          </mwc-list>
        </section>
      </div>
    `;
  }

  static styles = css`
    ${styles}

    mwc-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }

    :host {
      width: 100vw;
    }

    #containerTemplates {
      display: grid;
      grid-gap: 12px;
      padding: 8px 12px 16px;
      box-sizing: border-box;
      grid-template-columns: repeat(auto-fit, minmax(400px, auto));
    }

    @media (max-width: 387px) {
      #containerTemplates {
        grid-template-columns: repeat(auto-fit, minmax(196px, auto));
      }
    }
  `;
}