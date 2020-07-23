
export class Ouvrage {
    code: string;
    name: string;
    type: string;
    typeViewValue: string;
    site: string;
    center:string
    enabled: boolean;
    form: string;
    state: string;
    stateViewValue: string;
    process: string;
    nbCompartment: number;
    raftRating: number;
    coteTropFull: number;
    coordinateX: number;
    coordinateY: number;
    coordinateZ: number;
    area: number;
    installedCapacity: number;
    currentCapacity: number;
    hmt: number;
    power: number;
    nbPump: number;
    pumpDebit: number;
    constructionType: string;
    waterSource: string;
    commissioningDate: string;
    operatingDate: string;
    maitreOuvrage: string;
    realizationCost: number;
    remoteManagement: boolean;
    waterTank: boolean;
    tankCapacity1: number;
    tankCapacity2: number;
    specializedLine: boolean;
    abri: boolean;
    energyMonthlyBill: number;
    totalWorkforce: number;
    distribution: boolean;
    populationServed: number;
    chemicalMonthlyBill: number;
    coteTn: number;
    debitLoadBreaker:number;
    chargesAmontEtAval: number;
    currentDebit: number;
    exploitationDebit:number;
    electricAlimentation:boolean;
    tankType: string;
    tankRole: string;
    treatmentStationType:string;
    commune : string;


    constructor(ouvrage?) {
        ouvrage = ouvrage || {};
        this.code = ouvrage.code || '';
        this.name = ouvrage.name || '';
        this.type = ouvrage.type || '';
        this.typeViewValue = ouvrage.typeViewValue || '';
        this.enabled = ouvrage.enabled || false;
        this.form = ouvrage.form ||  '';
        this.state = ouvrage.state ||  '';
        this.stateViewValue = ouvrage.stateViewValue ||  '';
        this.process = ouvrage.process ||  '';
        this.nbCompartment = ouvrage.nbCompartment ||  '';
        this.raftRating = ouvrage.raftRating ||  '';
        this.coteTropFull = ouvrage.coteTropFull ||  '';
        this.coordinateX = ouvrage.coordinateX ||  '';
        this.coordinateY = ouvrage.coordinateY ||  '';
        this.coordinateZ = ouvrage.coordinateZ ||  '';
        this.area = ouvrage.area ||  '';
        this.installedCapacity = ouvrage.installedCapacity ||  '';
        this.currentCapacity = ouvrage.currentCapacity ||  '';
        this.hmt = ouvrage.hmt ||  '';
        this.power = ouvrage.power ||  '';
        this.nbPump = ouvrage.nbPump ||  '';
        this.pumpDebit = ouvrage.pumpDebit ||  '';
        this.constructionType = ouvrage.constructionType ||  '';
        this.waterSource = ouvrage.waterSource ||  '';
        this.commissioningDate = ouvrage.commissioningDate ||  '';
        this.operatingDate = ouvrage.operatingDate ||  '';
        this.maitreOuvrage = ouvrage.maitreOuvrage ||  '';
        this.realizationCost = ouvrage.realizationCost ||  '';
        this.remoteManagement = ouvrage.remoteManagement || false ;
        this.waterTank = ouvrage.waterTank || false ;
        this.tankCapacity1 = ouvrage.tankCapacity1 ||  '';
        this.tankCapacity2 = ouvrage.tankCapacity2 ||  '';
        this.specializedLine = ouvrage.specializedLine || false ;
        this.abri = ouvrage.abri || false;
        this.energyMonthlyBill = ouvrage.energyMonthlyBill ||  '';
        this.totalWorkforce = ouvrage.totalWorkforce ||  '';
        this.distribution = ouvrage.distribution || false ;
        this.populationServed = ouvrage.populationServed ||  '';
        this.chemicalMonthlyBill = ouvrage.chemicalMonthlyBill ||  '';
        this.coteTn = ouvrage.coteTn ||  '';
        this.debitLoadBreaker = ouvrage.debitLoadBreaker ||  '';
        this.chargesAmontEtAval = ouvrage.chargesAmontEtAval || '';
        this.currentDebit = ouvrage.currentDebit ||  '';
        this.exploitationDebit = ouvrage.exploitationDebit ||  '';
        this.electricAlimentation = ouvrage.electricAlimentation ||  false;
        this.tankType = ouvrage.tankType ||  '';
        this.tankRole = ouvrage.tankRole ||  '';
        this.treatmentStationType = ouvrage.treatmentStationType ||  '';
        this.commune = ouvrage.commune ||  '';

    }
}

export class OuvrageList {
    id: string;
    code : string;
    name:string;
    type: string;
    enabled: Boolean;
    state: string;
    installedCapacity: number;
    currentCapacity: number;

    constructor(ouvrage?) {
        ouvrage = ouvrage || {};
        this.id = ouvrage.id || '';
        this.code = ouvrage.code || '';
        this.name = ouvrage.name || '';
        this.type = ouvrage.type || '';
        this.enabled = ouvrage.enabled || false;
        this.state = ouvrage.state || '';
        this.installedCapacity = ouvrage.installedCapacity || null;
        this.currentCapacity = ouvrage.currentCapacity || null;
    }
}


export class OuvrageEdit {

    enabled: boolean;
    state: string;
    currentCapacity: number;
    power: number;
    pumpDebit: number;
    specializedLine: boolean;
    remoteManagement : boolean;
    abri: boolean;
    energyMonthlyBill: number;
    totalWorkforce: number;
    chemicalMonthlyBill: number;
    coteTn: number;
    debitLoadBreaker:number;
    chargesAmontEtAval: number;
    currentDebit: number;
    electricAlimentation:boolean;


    constructor(ouvrage?) {
        ouvrage = ouvrage || {};
        this.enabled = ouvrage.enabled || false;
        this.state = ouvrage.state ||  '';
        this.remoteManagement = ouvrage.remoteManagement ||  false;
        this.currentCapacity = ouvrage.currentCapacity ||  '';
        this.power = ouvrage.power ||  '';
        this.pumpDebit = ouvrage.pumpDebit ||  '';
        this.specializedLine = ouvrage.specializedLine || false ;
        this.abri = ouvrage.abri || false;
        this.energyMonthlyBill = ouvrage.energyMonthlyBill ||  '';
        this.totalWorkforce = ouvrage.totalWorkforce ||  '';
        this.chemicalMonthlyBill = ouvrage.chemicalMonthlyBill ||  '';
        this.coteTn = ouvrage.coteTn ||  '';
        this.debitLoadBreaker = ouvrage.debitLoadBreaker ||  '';
        this.chargesAmontEtAval = ouvrage.chargesAmontEtAval || '';
        this.currentDebit = ouvrage.currentDebit ||  '';
        this.electricAlimentation = ouvrage.electricAlimentation ||  false;

    }
}