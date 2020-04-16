export class Chain {
    id : string;
    code : string;
    name : string;
    enabled : boolean
    ouvrages : any[]
    constructor(chain?){
        chain = chain || {};
        this.id = chain.id || '';
        this.code = chain.code || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
    }
}

export class Ouvrage {

}

export class AllOuvrages {
    type : string;
    ouvrages : any[];
    constructor(type:string){
        this.type = type;
        this.ouvrages = [];
    }
}

export enum generalType {
    StationTraitementConventionelle='StationTraitementConventionelle', StationTraitementNonConventionelle='StationTraitementNonConventionelle', Reservoir='Reservoir', Forage='Forage', StationPompage='StationPompage', BriseCharge='BriseCharge', none='none'
}