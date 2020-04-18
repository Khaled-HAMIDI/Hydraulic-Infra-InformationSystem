export class ChainList {
    id : string;
    name : string;
    enabled : boolean;
    ouvragesNumber : number
    constructor(chain){
        this.id = chain.id || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
    }
}