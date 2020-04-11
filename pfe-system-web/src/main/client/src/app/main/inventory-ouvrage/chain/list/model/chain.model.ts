export class ChainList {
    id : string;
    name : string;
    enabled : boolean
    constructor(chain){
        this.id = chain.id || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
    }
}