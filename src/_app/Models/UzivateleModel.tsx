import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed } from "mobx";
import { Uzivatel } from "../Utils/Interfaces";

export class UzivateleModel{

    apiRequester: ApiRequest;
    @observable loading: boolean;

    @observable uzivatele: Uzivatel[];

    @computed get UzivatelAll(): Uzivatel[] {
        return (this.uzivatele == null) ? [] : this.uzivatele;
    }

    constructor(apiRequester: ApiRequest){
        this.apiRequester = apiRequester;
        this.load();
    }

    async load() {
        this.loading = true;
        await this.apiRequester.getAllUzivatel().then(data => { this.uzivatele = data });
        this.loading = false;
    }

    getUzivatelByNickName(nick: string){
        return this.uzivatele.find(u => u.nickName === nick);
    }

    getUzivatelId(uzivatelId: string){
        return this.uzivatele.find(u => u.id === uzivatelId);
    }

}