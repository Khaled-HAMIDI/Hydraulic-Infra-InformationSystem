export class Chain {
    code : string;
    name : string;
    enabled : boolean
    ouvrages : any[]
    constructor(chain?){
        chain = chain || {};
        this.code = chain.code || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
    }
}