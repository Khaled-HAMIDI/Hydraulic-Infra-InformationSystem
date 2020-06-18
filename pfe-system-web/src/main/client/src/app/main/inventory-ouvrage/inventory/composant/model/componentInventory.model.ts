export class componentInventory {
    componentType: string;
    state : string;
    gap:string;
    observation: string;
    done: Boolean;

    constructor(compoent?) {
        compoent = compoent || {};
        this.componentType = compoent.componentType || '';
        this.state = compoent.state || '';
        this.gap = compoent.gap || '';
        this.observation = compoent.observation || '';
        this.done = compoent.done || false;

    }
}