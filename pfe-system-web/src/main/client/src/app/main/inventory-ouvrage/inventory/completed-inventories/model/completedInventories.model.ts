export class Inventory {

    code: string;
    date: string;
    completed: boolean;
    finishDate :string;


    constructor(inventory?) {
        inventory = inventory || {};
        this.code = inventory.code || '';
        this.date = inventory.date || '';
        this.completed = inventory.completed || false;
        this.finishDate = inventory.finishDate || '';
    }

}