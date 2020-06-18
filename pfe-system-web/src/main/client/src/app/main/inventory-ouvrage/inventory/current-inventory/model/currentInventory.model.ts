export class OuvrageInventory {
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