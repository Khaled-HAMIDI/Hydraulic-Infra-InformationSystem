export class AntiBelier {
    
    typeComposant:string ;
    marque:string;
    capacity:number;
    presseionService:number;
    presseionEpreuve:number;
    presseionRegonflage:number;
    type:string;
    compresseur:boolean;
    cost : number;

    constructor(antiBelier?) {
        antiBelier = antiBelier || {};
        this.typeComposant=antiBelier.typeComposant || '';
        this.marque=antiBelier.marque || '';
        this.capacity=antiBelier.capacity || '';
        this.presseionService=antiBelier.presseionService || '';
        this.presseionEpreuve=antiBelier.presseionEpreuve || '';
        this.presseionRegonflage=antiBelier.presseionRegonflage || '';
        this.type=antiBelier.type || '';
        this.compresseur=antiBelier.compresseur || false;
        this.cost = antiBelier.cost || '';
    }
}

export class Security {
    
     typeComposant:string;
     closing:boolean;
     nature:string;
     guerites:number;
     agents:number;
     armement:boolean;
     telsurveillance:boolean;
     state:string;
    cost : number;

    constructor(security?) {
        security = security || {};
        this.typeComposant=security.typeComposant || '';
        this.closing=security.closing || false;
        this.nature=security.nature ||  '';
        this.guerites=security.guerites ||  '';
        this.agents=security.agents || '';
        this.armement=security.armement || false;
        this.telsurveillance=security.telsurveillance || false;
        this.state=security.state || '';
        this.cost = security.cost || '';
    }
}

export class PriseEau {
    
     typeComposant:string;
     type:string;
     dimension:string;
     nature:string;
    cost : number;

    constructor(priseEau?) {
        priseEau = priseEau || {};
        this.typeComposant=priseEau.typeComposant || '';
        this.type=priseEau.type || '';
        this.dimension=priseEau.dimension || '';
        this.nature=priseEau.nature || '';
        this.cost = priseEau.cost || '';
    }
}

export class EquipementStationTraitement {
    
     typeComposant:string;
     capacity:number;
     typeEquipement:string;
     type:string;
     number:number;
     form:string;
     nature:string;
     state:string;
     enabled:boolean;
    cost : number;

    constructor(equipementStationTratement?) {
        equipementStationTratement = equipementStationTratement || {};
        this.typeComposant=equipementStationTratement.typeComposant || '';
        this.capacity=equipementStationTratement.capacity || '';
        this.typeEquipement=equipementStationTratement.typeEquipement || '';
        this.type=equipementStationTratement.type || '';
        this.number=equipementStationTratement.number || '';
        this.form=equipementStationTratement.form || '';
        this.nature=equipementStationTratement.nature || '';
        this.state=equipementStationTratement.state || '';
        this.enabled=equipementStationTratement.enabled || false;
        this.cost =equipementStationTratement .cost || '';
    }
    
}

export class KitMembrane {
    
     typeComposant:string;
     caracteristique:string;
     nombre:number;
    cost : number;

    constructor(kitMembrane?) {
        kitMembrane = kitMembrane || {};
        this.typeComposant=kitMembrane.typeComposant || '';
        this.caracteristique=kitMembrane.caracteristique || '';
        this.nombre=kitMembrane.nombre || '';
        this.cost = kitMembrane.cost || '';
    }
    
}

export class StationPhp {
    
    typeComposant:string;
    debit:number;
    hmt:number;
    puissance:number;
    nombre:number;
    cost : number;

    constructor(stationPhp?) {
        stationPhp = stationPhp || {};
        this.typeComposant=stationPhp.typeComposant || '';
        this.debit=stationPhp.debit || '';
        this.hmt=stationPhp.hmt || '';
        this.puissance=stationPhp.puissance || '';
        this.nombre=stationPhp.nombre || '';
        this.cost = stationPhp.cost || '';
    }
}

export class LocalStockage {

    typeComposant:string;
    type:string;
    form:string;
    dimension:string;
    arrangement:string;
    number:number;
    state:string;
    cost : number;

    constructor(localStockage?) {
        localStockage = localStockage || {};
        this.typeComposant=localStockage.typeComposant || '';
        this.type=localStockage.type || '';
        this.form=localStockage.form || '';
        this.dimension=localStockage.dimension || '';
        this.arrangement=localStockage.arrangement || '';
        this.number=localStockage.number || '';
        this.state=localStockage.state || '';
        this.cost = localStockage.cost || '';
    }

}

export class BatimentElectrique {

    typeComposant:string;
    state:string;
    nature:string;
    area:number;
    cost : number;

    constructor(batimentElectrique?) {
        batimentElectrique = batimentElectrique || {};
        this.typeComposant=batimentElectrique.typeComposant || '';
        this.area=batimentElectrique.area || '';
        this.nature=batimentElectrique.nature || '';
        this.state=batimentElectrique.state || '';
        this.cost = batimentElectrique.cost || '';
    }
    
}

export class GroupeElectrogene {
    
    typeComposant:string;
    cuve:number;
    nature:string;
    puissance:number;
    number:number;
    cost : number;

    constructor(groupeElectrogene?) {
        groupeElectrogene = groupeElectrogene || {};
        this.typeComposant=groupeElectrogene.typeComposant || '';
        this.cuve=groupeElectrogene.cuve || '';
        this.nature=groupeElectrogene.nature || '';
        this.puissance=groupeElectrogene.puissance || '';
        this.number=groupeElectrogene.number || '';
        this.cost =groupeElectrogene .cost || '';
    }
    
}

export class PostChimique {

    typeComposant:string;
    postType:string;
    type:string;
    dimension:number;
    form:string;
    number:number;
    lieuImplantation:string;
    pointInjectPompe:string;
    dosagePompe:string;
    typePompe:string;
    debitPompe:number;
    hmtPompe:number;
    puissancePompe:number;
    nombrePompe:number;
    fonctionnementPompe:boolean;
    modePompe:string;
    statePompe:string;
    cost : number;

    constructor(postChimique?) {
        postChimique = postChimique || {};
        this.typeComposant=postChimique.typeComposant || '';
        this.postType=postChimique.postType || '';
        this.type=postChimique.type || '';
        this.dimension=postChimique.dimension || '';
        this.form=postChimique.form || '';
        this.number=postChimique.number || '';
        this.lieuImplantation=postChimique.lieuImplantation || '';
        this.pointInjectPompe=postChimique.pointInjectPompe || '';
        this.dosagePompe=postChimique.dosagePompe || '';
        this.typePompe=postChimique.typePompe || '';
        this.debitPompe=postChimique.debitPompe || '';
        this.hmtPompe=postChimique.hmtPompe || '';
        this.puissancePompe=postChimique.puissancePompe || '';
        this.nombrePompe=postChimique.nombrePompe || '';
        this.fonctionnementPompe=postChimique.fonctionnementPompe || false;
        this.modePompe=postChimique.modePompe || '';
        this.statePompe=postChimique.statePompe || '';
        this.cost = postChimique.cost || '';
    }
    
}

export class PosteTransformationElectrique {

    typeComposant:string;
    marque:string;
    puissance:number;
    up:number;
    is:number;
    ucc:number;
    couplage:string;
    natureHuile:string;
    natureAbri:string;
    pmt:number;
    pbt:number;
    pmd:number;
    tarif:number;
    pma:number;
    typeComptage:string;
    cost : number;

    constructor(posteTransformationElectrique?) {
        posteTransformationElectrique = posteTransformationElectrique || {};
        this.typeComposant=posteTransformationElectrique.typeComposant || '';
        this.marque=posteTransformationElectrique.marque || '';
        this.puissance=posteTransformationElectrique.puissance || '';
        this.up=posteTransformationElectrique.up || '';
        this.is=posteTransformationElectrique.is || '';
        this.ucc=posteTransformationElectrique.ucc || '';
        this.couplage=posteTransformationElectrique.couplage || '';
        this.natureHuile=posteTransformationElectrique.natureHuile || '';
        this.natureAbri=posteTransformationElectrique.natureAbri || '';
        this.pmt=posteTransformationElectrique.pmt || '';
        this.pbt=posteTransformationElectrique.pbt || '';
        this.pmd=posteTransformationElectrique.pmd || '';
        this.tarif=posteTransformationElectrique.tarif || '';
        this.pma=posteTransformationElectrique.pma || '';
        this.typeComptage=posteTransformationElectrique.typeComptage || '';
        this.cost = posteTransformationElectrique.cost || '';
    }

}

export class GroupeElectroPompe {

    typeComposant:string;
    marque:string;
    hmt:number;
    state:string;
    operatingDate:string;
    npsh:number;
    rotationSpeed:number;
    debit:number;
    nbService:number;
    nbSecours:number;
    genre:string;
    cost : number;

    constructor(groupeElectroPompe?) {
        groupeElectroPompe = groupeElectroPompe || {};
        this.typeComposant=groupeElectroPompe.typeComposant || '';
        this.marque=groupeElectroPompe.marque || '';
        this.hmt=groupeElectroPompe.hmt || '';
        this.state=groupeElectroPompe.state || '';
        this.operatingDate=groupeElectroPompe.operatingDate || '';
        this.npsh=groupeElectroPompe.npsh || '';
        this.rotationSpeed=groupeElectroPompe.rotationSpeed || '';
        this.debit=groupeElectroPompe.debit || '';
        this.nbService=groupeElectroPompe.nbService || '';
        this.nbSecours=groupeElectroPompe.nbSecours || '';
        this.genre=groupeElectroPompe.genre || '';
        this.cost = groupeElectroPompe.cost || '';
    }

}

export class GroupeElectroMoteur {

    typeComposant:string;
    marque:string;
    puissance:number;
    state:string;
    modeDemarrage:string;
    type:string;
    operatingDate:string;
    nbService:number;
    nbSecours:number;
    tensionAlimentation:number;
    intensite:number;
    speed:number;
    cost : number;

    constructor(groupeElectroMoteur?) {
        groupeElectroMoteur = groupeElectroMoteur || {};
        this.typeComposant=groupeElectroMoteur.typeComposant || '';
        this.marque=groupeElectroMoteur.marque || '';
        this.puissance=groupeElectroMoteur.puissance || '';
        this.state=groupeElectroMoteur.state || '';
        this.modeDemarrage=groupeElectroMoteur.modeDemarrage || '';
        this.type=groupeElectroMoteur.type || '';
        this.operatingDate=groupeElectroMoteur.operatingDate || '';
        this.nbService=groupeElectroMoteur.nbService || '';
        this.nbSecours=groupeElectroMoteur.nbSecours || '';
        this.tensionAlimentation=groupeElectroMoteur.tensionAlimentation || '';
        this.intensite=groupeElectroMoteur.intensite || '';
        this.speed=groupeElectroMoteur.speed || '';
        this.cost = groupeElectroMoteur.cost || '';
    }

}

export class ArmoireElectrique {

    typeComposant:string;
    puissance:number;
    number:number;
    observation:string;
    state:string;
    marque:string;
    cost : number;

    constructor(armoireElectrique?) {
        armoireElectrique = armoireElectrique || {};
        this.typeComposant=armoireElectrique.typeComposant || '';
        this.puissance=armoireElectrique.puissance || '';
        this.number=armoireElectrique.number || '';
        this.observation=armoireElectrique.observation || '';
        this.state=armoireElectrique.state || '';
        this.marque=armoireElectrique.marque || '';
        this.cost = armoireElectrique.cost || '';
    }

}

export class SoupapeDecharge {

    typeComposant:string;
    marque:string;
    presseionService:number;
    presseionEtanchiete:number;
    presseionTarage:number;
    type:string;
    cost : number;

    constructor(soupapeDecharge?) {
        soupapeDecharge = soupapeDecharge || {};
        this.typeComposant=soupapeDecharge.typeComposant || '';
        this.marque=soupapeDecharge.marque || '';
        this.presseionService=soupapeDecharge.presseionService || '';
        this.presseionEtanchiete=soupapeDecharge.presseionEtanchiete || '';
        this.presseionTarage=soupapeDecharge.presseionTarage || '';
        this.type=soupapeDecharge.type || '';
        this.cost = soupapeDecharge.cost || '';
    }

}

export class EquipementHydroMeca {

    typeComposant:string;
    equipementType:string;
    type:string;
    number:number;
    dn:number;
    pn:number;
    materiaux:string;
    state:string;
    lieuImplantation:string;
    cost : number;

    constructor(equipementHydroMeca?) {
        equipementHydroMeca = equipementHydroMeca || {};
        this.typeComposant=equipementHydroMeca.typeComposant || '';
        this.equipementType=equipementHydroMeca.equipementType || '';
        this.type=equipementHydroMeca.type || '';
        this.number=equipementHydroMeca.number || '';
        this.dn=equipementHydroMeca.dn || '';
        this.pn=equipementHydroMeca.pn || '';
        this.materiaux=equipementHydroMeca.materiaux || '';
        this.state=equipementHydroMeca.state || '';
        this.lieuImplantation=equipementHydroMeca.lieuImplantation || '';
        this.cost = equipementHydroMeca.cost || '';
    }

}

export class PosteChloration {

    typeComposant:string;
    abri:boolean;
    type:string;
    dimension:number;
    dosagePompe:string;
    pointInjectPompe:string;
    typePompe:string;
    debitPompe:number;
    hmtPompe:number;
    puissancePompe:number;
    nombrePompe:number;
    fonctionnementPompe:boolean;
    statePompe:string;
    cost : number;

    constructor(posteChloration?) {
        posteChloration = posteChloration || {};
        this.typeComposant=posteChloration.typeComposant || '';
        this.abri=posteChloration.abri || false;
        this.type=posteChloration.type || '';
        this.dimension=posteChloration.dimension || '';
        this.dosagePompe=posteChloration.dosagePompe || '';
        this.pointInjectPompe=posteChloration.pointInjectPompe || '';
        this.typePompe=posteChloration.typePompe || '';
        this.debitPompe=posteChloration.debitPompe || '';
        this.hmtPompe=posteChloration.hmtPompe || '';
        this.puissancePompe=posteChloration.puissancePompe || '';
        this.nombrePompe=posteChloration.nombrePompe || '';
        this.fonctionnementPompe=posteChloration.fonctionnementPompe || false;
        this.statePompe=posteChloration.statePompe || '';
        this.cost = posteChloration.cost || '';
    }

}