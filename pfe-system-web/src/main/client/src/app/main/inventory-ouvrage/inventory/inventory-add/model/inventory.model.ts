export class Inventory {

    code: string;
    responsable: any;
    date: string;
    completed: boolean;
    responsablesOuvrage: any [];


    constructor(inventory?) {
        inventory = inventory || {};
        this.code = inventory.code || '';
        this.responsable = inventory.responsable || '';
        this.date = inventory.date || '';
        this.completed = inventory.completed || false;
        this.responsablesOuvrage = inventory.responsablesOuvrage || []
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

export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    employeeCode: string;
    email: string;
    phoneNumber: string;
    structure: UserStructure;
    enabled: boolean;


    /**
     * Constructor
     *
     * @param user
     */
    constructor(user?) {
        user = user || {};
        this.id = user.id || '';
        this.username = user.username || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.employeeCode = user.employeeCode || '';
        this.email = user.email || '';
        this.phoneNumber = user.phoneNumber || '';
        this.enabled = user.enabled;
        this.structure = user.structure || null;
    }
}

export class UserStructure {
    id: string;
    type: string;
    designation: string;
    parentStructure: UserStructure;

    constructor(userStructure) {
        this.type = userStructure.type;
        this.designation = userStructure.designation;
        this.parentStructure = userStructure.parentStructure;
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