import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed, action } from "mobx";
import { Uzivatel, Dochazka, DochazkaDTO } from "../Utils/Interfaces";
import { DochazkaRowModel } from "../Models/DochazkaRowModel";
import { StavUzivateleModel } from "./StavUzivateleModel";
import { TypPraceUzivateleModel } from "./TypPraceUzivateleModel";
import { UzivateleModel } from "./UzivateleModel";
import { AutoModel } from "./AutoModel";

export class DochazkaModel {

    apiRequester: ApiRequest;
    @observable loading: boolean;

    //otestovat jestli funguje private @oibservable
    @observable dochazky: Dochazka[];

    @observable dochazkyModels: DochazkaRowModel[];

    @observable stavModel: StavUzivateleModel;

    @observable typPraceModel: TypPraceUzivateleModel;

    @observable uzivateleModel: UzivateleModel;

    @observable autoModel: AutoModel;


    @computed get DochazkaAll(): Dochazka[] {
        return (this.dochazky == null) ? [] : this.dochazky;
    }

    @computed get DochazkaRowModelsAll(): DochazkaRowModel[] {

        if (this.dochazkyModels == null)
        {
            return [];
        } 
        else{
            let sorted1 = this.dochazkyModels.sort(a => {
                //chci mit navrchu ty přítomné v práci
                if (a.jeVPraci) {
                    return -1;
                }
                else return 1;
            });
            let sorted2 = sorted1.sort((a,b) => {
                let aDate = new Date(a.dochazka.prichod);
                let bDate = new Date(b.dochazka.prichod);
                if (aDate > bDate)
                {
                    return -1;
                }
                else return 1;
            })
            return sorted2;
        }
    }

    @computed get DochazkaPritomni(): DochazkaRowModel[] {
        return (this.dochazkyModels == null) ? [] : this.DochazkaRowModelsAll.filter(i => i.jeVPraci);
    }

    @computed get DochazkaNepritomni(): DochazkaRowModel[] {
        return (this.dochazkyModels == null) ? [] : this.DochazkaRowModelsAll.filter(i => !i.jeVPraci);
    }

    constructor(apiRequester: ApiRequest) {
        this.apiRequester = apiRequester;
        this.dochazkyModels = [];

        this.stavModel = new StavUzivateleModel(this.apiRequester);
        this.typPraceModel = new TypPraceUzivateleModel(this.apiRequester);
        this.uzivateleModel = new UzivateleModel(this.apiRequester);
        this.autoModel = new AutoModel(this.apiRequester);

        this.load();
    }


    @action.bound
    async prichodOsoby(idUzivatel: string, idTypPrace: string, idAuto: string) {
        console.log("Should make prichod and DB prichod");
        this.loading = true;
        //update db
        let now = new Date(Date.now());
        let nowFormatted = ApiRequest.formatTimeToMysqlFormat(now);
        let dto: DochazkaDTO = {
            prichod: nowFormatted,
            odchod: null,
            idUzivatel: idUzivatel,
            idTypPraceUzivatele: idTypPrace,
            idStavUzivatele: "1", // novy stav nastaven vyse
            idAuto: idAuto
        }
        let createdDochazka = await this.apiRequester.postDochazka(dto);
        console.log("CREATED", createdDochazka);

        //update client
        this.dochazky.push(createdDochazka);
        this.dochazkyModels.push(new DochazkaRowModel(createdDochazka, this.stavModel, this.apiRequester));
        this.loading = false;
    }



    async load() {
        this.loading = true;
        await this.apiRequester.getAllDochazka().then(data => { this.dochazky = data });
        this.DochazkaAll.forEach(d => {
            this.dochazkyModels.push(new DochazkaRowModel(d, this.stavModel, this.apiRequester));
        });
        this.loading = false;
    }
}