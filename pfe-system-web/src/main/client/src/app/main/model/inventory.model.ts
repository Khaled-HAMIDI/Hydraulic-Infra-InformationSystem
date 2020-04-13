export class Inventory {

    code: string;
    responsable: number;
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