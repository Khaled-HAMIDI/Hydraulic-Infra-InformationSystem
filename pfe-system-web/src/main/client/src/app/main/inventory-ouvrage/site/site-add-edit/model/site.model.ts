export class Site {
    id:string;
    name:string
    space : number;
    constructor(site?) {
        site = site || {};
        this.id = site.id || '';
        this.name = site.name || '';
        this.space = site.space
    }
}