export class Chain {
    id: string;
    code: string;
    name: string;
    enabled: boolean
    ouvrages: any[]
    constructor(chain?) {
        chain = chain || {};
        this.id = chain.id || null;
        this.code = chain.code || '';
        this.name = chain.name || '';
        this.ouvrages = chain.ouvrages || []
        this.enabled = chain.enabled || false;
    }
}

export class Ouvrage {

}

export class AllOuvrages {
    type: string;
    ouvrages: any[];
    nbCheked : number;
    constructor(type: string) {
        this.type = type;
        this.ouvrages = [];
        this.nbCheked = 0 ;
    }
}

export enum generalType {
    StationTraitementConventionelle = 'SC',
    StationTraitementNonConventionelle = 'SN',
    Reservoir = 'RE',
    Forage = 'FO',
    StationPompage = 'SP',
    BriseCharge = 'BC',
    none = 'none'
}