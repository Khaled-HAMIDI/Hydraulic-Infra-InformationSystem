export class ChainList {
    id : string;
    code : string;
    name : string;
    enabled : boolean;
    ouvragesNumber : number
    constructor(chain){
        this.id = chain.id || '';
        this.code = chain.code || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
        this.ouvragesNumber = chain.ouvragesNumber || null;
    }
}