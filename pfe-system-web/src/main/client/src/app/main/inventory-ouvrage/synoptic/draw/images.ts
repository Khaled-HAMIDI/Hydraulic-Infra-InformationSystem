// const path = 'assets/images/ouvrages/'
// export const images = {
//     'SP': path + 'sp.png',
//     'R': path + 'reservoir.png',
//     'F': path + 'forage.png'
// }


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
      "meta": {"interface": { "source": "100", "target": "96" } }
    },
    { "source": "STKharrouba-", "target": "SR2-SP2" },
    { "source": "SR1-R2", "target": "R1-" },
    { "source": "SR1-SP1", "target": "SR1-R2" },
    { "source": "SR2-R3", "target": "R1-" },
    { "source": "SR2-SP2", "target": "SR2-R3" },
    { "source": "R1-", "target": "POPU-" },
  ]
}
