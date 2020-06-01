export class Inventory {

    code: string;
    responsable: any;
    date: string;
    completed: boolean;


    constructor(inventory?) {
        inventory = inventory || {};
        this.code = inventory.code || '';
        this.responsable = inventory.responsable || '';
        this.date = inventory.date || '';
        this.completed = inventory.completed || false;
    }

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

    StationTraitementConventionelle = 'StationTraitementConventionelle',
    StationTraitementNonConventionelle = 'StationTraitementNonConventionelle',
    Reservoir = 'Reservoir',
    Forage = 'Forage',
    StationPompage = 'StationPompage',
    BriseCharge = 'BriseCharge',
    none = 'none'
}