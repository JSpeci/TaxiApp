import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed } from "mobx";
import { Objednavka } from "../Utils/Interfaces";

export class ObjednavkyModel{

    apiRequester: ApiRequest;
    @observable loading: boolean;

    @observable objednavky: Objednavka[];

    @computed get ObjednavkyAll(): Objednavka[] {
        return (this.objednavky == null) ? [] : this.objednavky;
    }

    constructor(apiRequester: ApiRequest){
        this.apiRequester = apiRequester;
        this.load();
    }

    async load() {
        this.loading = true;
        await this.apiRequester.getAllObjednavka().then(data => { this.objednavky = data });
        this.loading = false;
    }

}