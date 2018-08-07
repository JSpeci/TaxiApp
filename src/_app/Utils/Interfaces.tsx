export interface Objednavka {
    id: string;
    adresaKam: string;
    pocetAut: number;
    casVzniku: string;
    casPristaveniVozu: string;
    casVyrizeni: string;
    kontaktNaKlienta: string;
    StavObjednavky: StavObjednavky;
    Dochazka: Dochazka;
}
export interface Uzivatel {
    id: string;
    nickName: string;
    login: string | null;
    celeJmeno: string;
    role: RoleUzivatele;
}
export interface Dochazka {
    id: string;
    prichod: string;
    odchod: string | null;
    Uzivatel: Uzivatel;
    TypPraceUzivatele: TypPraceUzivatele;
    StavUzivatele: StavUzivatele;
    Auto: Auto;
}
export interface RoleUzivatele {
    id: string | null;
    nazevRole: string;
}
export interface Auto {
    id: string;
    znacka: string;
    typ: string | null;
    barva: string;
    rokVyroby: string | null;
    pocetMist: string;
    idVysilacka: string | null;
    cisloMagistratni: string | null;
    registracniZnacka: string | null;
}
export interface TypPraceUzivatele {
    id: string;
    typPraceUzivatele: string;
}
export interface StavUzivatele {
    id: string;
    nazevStavu: string;
}
export interface StavObjednavky {
    id: number;
    nazevStavu: string;
}


export interface DochazkaDTO {
    idDochazka?: string;
    prichod: string;
    odchod: string | null;
    idUzivatel: string;
    idTypPraceUzivatele: string;
    idStavUzivatele: string;
    idAuto: string;
}