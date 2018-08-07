import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed } from "mobx";
import { Auto } from "../Utils/Interfaces";

export class AutoModel{

    apiRequester: ApiRequest;
    @observable loading: boolean;

    @observable auta: Auto[];

    @computed get AutaAll(): Auto[] {
        return (this.auta == null) ? [] : this.auta;
    }

    constructor(apiRequester: ApiRequest){
        this.apiRequester = apiRequester;
        this.load();
    }

    async load() {
        this.loading = true;
        await this.apiRequester.getAllAuto().then(data => { this.auta = data });
        this.loading = false;
    }

    getAutoById(autoId: string){
        return this.auta.find(a => a.id === autoId);
    }
}