export class Chain {
    id : string;
    name : string;
    enabled : boolean;
    ouvrages : any[]
    constructor(chain){
        this.id = chain.id || '';
        this.name = chain.name || '';
        this.enabled = chain.enabled || false;
        this.ouvrages = chain.ouvrages || []
    }
}