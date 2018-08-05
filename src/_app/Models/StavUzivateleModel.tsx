import { observable, action } from "mobx";
import { StavUzivatele } from "../Utils/Interfaces";
import { ApiRequest } from "../Utils/ApiRequest";

export class StavUzivateleModel {

  @observable array: StavUzivatele[];

  @observable selected: StavUzivatele;

  apiRequester: ApiRequest;
  constructor(apiRequester: ApiRequest) {
    this.apiRequester = apiRequester;
    this.load();
  }

  async load() {
    await this.apiRequester.getStavy().then(data => { this.array = data });
  }

  @action.bound
  stavChanged(nazev: string) {
    console.log("Stav Changed on stav model", nazev);
  }

  getStavByName(nazev: string) {
    return this.array.find(f => f.nazevStavu == nazev);
  }

  getStavById(id: string) {
    return this.array.find(f => f.id == id);
  }

}