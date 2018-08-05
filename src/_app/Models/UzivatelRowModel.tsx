import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed } from "mobx";
import { Uzivatel } from "../Utils/Interfaces";
import { StavUzivateleModel } from "./StavUzivateleModel";

export class UzivatelRowModel{

    apiRequester: ApiRequest;
    
    //otestovat jestli funguje private @oibservable

    @observable uzivatel: Uzivatel;
    @observable stav: StavUzivateleModel;

    constructor(uzivatel: Uzivatel, apiRequester: ApiRequest){
        this.apiRequester = apiRequester;
        this.uzivatel = uzivatel;
    }
}