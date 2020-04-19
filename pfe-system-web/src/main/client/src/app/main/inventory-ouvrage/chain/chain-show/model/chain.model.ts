export class Chain {
    id : string;
    code : String;
    name : string;
    enabled : boolean;
    ouvrages : any[]
    constructor(chain){
        this.id = chain.id || '';
        this.code = chain.code || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
        this.ouvrages = chain.ouvrages || []
    }
}