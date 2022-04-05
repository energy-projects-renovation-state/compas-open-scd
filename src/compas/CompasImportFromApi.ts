import {customElement, html, LitElement, TemplateResult} from "lit-element";

import '@material/mwc-button';

import {newOpenDocEvent, newWizardEvent} from "../foundation.js";

import {createLogEvent, handleError, handleResponse, parseXml} from "../compas-services/foundation.js";
import {dispatchEventOnOpenScd} from "./foundation.js";

import '../WizardDivider.js';
import './CompasSclTypeList.js';
import './CompasScl.js';
import { CompasSettings } from "./CompasSettings.js";
import { CompasCimMappingService } from "../compas-services/CompasCimMappingService.js";

@customElement('compas-import-from-api')
export default class CompasImportFromApiElement extends LitElement {
  private async processCimFile(name: string) {
    const url = CompasSettings().compasSettings.importFromApiUrl;

    const doc = await fetch(url + '/' + name + '.xml')
    .catch(handleError)
    .then(handleResponse)
    .then(parseXml);
    
    await CompasCimMappingService().map({cimData: [{name: name + '.xml', doc: doc}]}).then(response => {
      const sclName = name + ".ssd";

      const sclElement = response.querySelectorAll("SCL").item(0);
      const sclDocument = document.implementation.createDocument("", "", null);
      sclDocument.getRootNode().appendChild(sclElement.cloneNode(true));

      dispatchEventOnOpenScd(newOpenDocEvent(sclDocument, sclName));
    }).catch(createLogEvent);

    dispatchEventOnOpenScd(newWizardEvent());
  }

  render(): TemplateResult {
    return html `
    <filtered-list>
    <mwc-list-item
      @click=${() => this.processCimFile('cim-eq-hoorn-v3')}>
      cim-eq-hoorn-v3
    </mwc-list-item>
    <mwc-list-item
      @click=${() => this.processCimFile('cim-eq-makkum')}>
      cim-eq-makkum
    </mwc-list-item>
    <mwc-list-item
      @click=${() => this.processCimFile('cim-eq-winselingseweg-voorbeeld')}>
      cim-eq-winselingseweg-voorbeeld
    </mwc-list-item>
    <mwc-list-item
      @click=${() => this.processCimFile('EQ-entsoe-voorbeeld')}>
      EQ-entsoe-voorbeeld
    </mwc-list-item>
  </filtered-list>
    `
  }
}
