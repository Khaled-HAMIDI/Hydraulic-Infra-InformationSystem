export class Site {
    id : string;
    name: string;
    constructor(site?){
        site = site || {};
        this.id = site.id || '';
        this.name = site.name || '';
    }
}