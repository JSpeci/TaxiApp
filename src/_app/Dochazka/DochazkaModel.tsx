import { ApiRequest } from "../Utils/ApiRequest";
import { observable, computed, action } from "mobx";
import { Uzivatel, Dochazka, DochazkaDTO } from "../Utils/Interfaces";
import { DochazkaRowModel } from "../Models/DochazkaRowModel";
import { StavUzivateleModel } from "../Models/StavUzivateleModel";
import { TypPraceUzivateleModel } from "../Models/TypPraceUzivateleModel";
import { UzivateleModel } from "../Models/UzivateleModel";
import { AutoModel } from "../Models/AutoModel";

export class DochazkaModel {

    apiRequester: ApiRequest;
    @observable loading: boolean;

    @observable private dochazky: Dochazka[];

    @observable dochazkyModels: DochazkaRowModel[];

    @observable stavModel: StavUzivateleModel;

    @observable typPraceModel: TypPraceUzivateleModel;

    @observable uzivateleModel: UzivateleModel;

    @observable autoModel: AutoModel;

    @observable pocetDniDoMinulosti: number = 2;

    @observable loadedYet: boolean = false;

    @computed get ShouldReload() : boolean {
        return !this.loadedYet;
    }

    @computed get DochazkaAll(): Dochazka[] {
        return (this.dochazky == null) ? [] : this.dochazky;
    }

    @computed get DochazkaRowModelsAll(): DochazkaRowModel[] {

        if (this.dochazkyModels == null) {
            return [];
        }
        else {
            let sorted1 = this.dochazkyModels.sort(a => {
                //chci mit navrchu ty přítomné v práci
                if (a.jeVPraci) {
                    return -1;
                }
                else return 1;
            });
            let sorted2 = sorted1.sort((a, b) => {
                let aDate = new Date(a.dochazka.prichod);
                let bDate = new Date(b.dochazka.prichod);
                if (aDate > bDate) {
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
        this.loadedYet = false;
        //this.load();
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


    @action.bound
    async incrementPocetDniDoMinulosti() {
        this.loadedYet = false;
        this.loading = true;
        this.pocetDniDoMinulosti = this.pocetDniDoMinulosti + 1;
        await this.load();
        this.loading = false;
    }

    @action.bound
    async changePocetDniDoMinulost(dny: number) {
        this.loadedYet = false;
        this.loading = true;
        this.pocetDniDoMinulosti = dny;
        await this.load();
        this.loading = false;
    }

    async load() {
        this.loading = true;
        if (this.ShouldReload) {
            await this.apiRequester.getAllDochazkaDaysAgo(this.pocetDniDoMinulosti).then(data => { this.dochazky = data });
            this.syncModels();
            this.loadedYet = true;
        }
        this.loading = false;
    }

    private syncModels() {
        this.dochazkyModels = [];
        this.DochazkaAll.forEach(d => {
            this.dochazkyModels.push(new DochazkaRowModel(d, this.stavModel, this.apiRequester));
        });
    }
}