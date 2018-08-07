import { observable, action } from "mobx";
import { TypPraceUzivatele } from "../Utils/Interfaces";
import { ApiRequest } from "../Utils/ApiRequest";

export class TypPraceUzivateleModel {

  @observable array: TypPraceUzivatele[];

  apiRequester: ApiRequest;
  constructor(apiRequester: ApiRequest) {
    this.apiRequester = apiRequester;
    this.load();
  }

  async load() {
    await this.apiRequester.getTypyPrace().then(data => { this.array = data });
  }

  @action.bound
  stavChanged(nazev: string) {
    console.log("Stav Changed on stav model", nazev);
  }

  getTypByName(nazev: string) {
    return this.array.find(f => f.typPraceUzivatele === nazev);
  }

  getTypById(typPraceId: string) {
    return this.array.find(t => t.id === typPraceId);
  }

}