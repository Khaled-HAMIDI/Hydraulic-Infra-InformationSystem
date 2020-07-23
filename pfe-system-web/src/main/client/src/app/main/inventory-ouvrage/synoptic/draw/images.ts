const path = 'assets/images/ouvrages/'
export enum images  {
  SP= 'assets/images/ouvrages/pump.png',
  R= 'assets/images/ouvrages/tank.png',
  TC='assets/images/ouvrages/production.png',
  TNC='assets/images/ouvrages/production.png',
  B='assets/images/ouvrages/brise.png',
  F='assets/images/ouvrages/forage.png'
}


export const nodes = {
  "nodes": [
    { "name": "STKharrouba-", "icon": "assets/images/ouvrages/production.png", "meta": { "title": "STKharrouba" } },
    { "name": "SR1-SP1", "icon": "assets/images/ouvrages/pump.png", "meta": { "title": "SP1" } },
    { "name": "SR2-SP2", "icon": "assets/images/ouvrages/pump.png", "meta": { "title": "SP2" } },
    { "name": "R1-", "icon": "assets/images/ouvrages/tank.png", "meta": { "title": "R1" } },
    { "name": "SR1-R2", "icon": "assets/images/ouvrages/tank.png", "meta": { "title": "R2" } },
    { "name": "SR2-R3", "icon": "assets/images/ouvrages/tank.png", "meta": { "title": "R3" } },
    { "name": "POPU-" },
  ],
  "links": [
    {
      "source": "STKharrouba-", "target": "SR1-SP1",
      "meta": { "interface": { "source": "100", "target": "96" } }
    },
    { "source": "STKharrouba-", "target": "SR2-SP2" },
    { "source": "SR1-R2", "target": "R1-" },
    { "source": "SR1-SP1", "target": "SR1-R2" },
    { "source": "SR2-R3", "target": "R1-" },
    { "source": "SR2-SP2", "target": "SR2-R3" },
    { "source": "R1-", "target": "POPU-" },
  ]
}

export class node {
  name: string;
  icon: string;
  meta: any;
  constructor(node?) {
    node = node || {};
    this.name = node.name || '';
    this.icon = node.icon || '';
    this.meta = node.meta || {};
  }
}

export class link {
  source: string;
  target: string;
  meta: any;
  constructor(link?) {
    link = link || {};
    this.source = link.source || '';
    this.target = link.target || '';
    
    this.meta = link.meta || {};
  }
}

export enum generalType {
  StationTraitementConventionelle='SC', StationTraitementNonConventionelle='SN', Reservoir='RE', Forage='FO', StationPompage='SP', BriseCharge='BC', none='none'
}