import { Subscriber } from 'rxjs';

export class PlaceConsumption {
    id: string;
    designation: string;
    wilaya: string;
    address: Address;
    buildingType: string;
    sanitationNetwork: boolean;
    code: string;
    owner: string;
    constructor(placeconsumption?) {
        placeconsumption = placeconsumption || {};
        this.id = placeconsumption.id;
        this.designation = placeconsumption.designation;
        this.wilaya = placeconsumption.wilaya;
        this.address = placeconsumption.address || {};
        this.buildingType = placeconsumption.buildingType;
        this.sanitationNetwork = placeconsumption.sanitationNetwork;
        this.code = placeconsumption.code;
        this.owner = placeconsumption.owner;
    }
}


export class DbPlaceConsumptionList {
    id: string;
    code: string;
    address: string;
    designation:string;
    subscriptionActivity: string;
    agency: string;
    subscriber:String;
    constructor(placeconsumption?) {
        placeconsumption = placeconsumption || {};
        this.id = placeconsumption.id || '';
        this.code = placeconsumption.code || '';
        this.designation = placeconsumption.designation || '';
        this.address = placeconsumption.address || '';
        this.subscriptionActivity = placeconsumption.subscriptionActivity || '';
        this.agency = placeconsumption.agency || '';
        this.subscriber=placeconsumption.subscriber || '';
    }
}


export class DbPlaceConsumptionOne {
    id: string;
    code: string;
    address: Address;
    designation:string;
    subscriptionActivity: string;
    sanitationNetwork: boolean;
    owner: string;
    contract: string;
    tour: Tour;
    agency: Agency;
    subscriber: String;
    constructor(placeconsumption?) {
        placeconsumption = placeconsumption || {};
        this.id = placeconsumption.id || '';
        this.code = placeconsumption.code || '';
        this.address = placeconsumption.address || {};
        this.designation = placeconsumption.designation || '';
        this.subscriptionActivity = placeconsumption.subscriptionActivity || '';
        this.sanitationNetwork = placeconsumption.sanitationNetwork || false;
        this.owner = placeconsumption.owner || '';
        this.contract = placeconsumption.contract || '';
        this.agency = placeconsumption.agency || {};
        this.tour = placeconsumption.tour || {};
        this.subscriber=placeconsumption.subscriber || '';
    }
}

export class DbPlaceConsumptionUpdate {
    id: string;
    address: Address;
    sanitationNetwork: boolean;
    designation:string;
    owner: string;
    subsciber:String;
    constructor(placeconsumption?) {
        this.id = placeconsumption.id || '';
        placeconsumption = placeconsumption || {};
        this.address = placeconsumption.address || {};
        this.designation = placeconsumption.designation || '';
        this.sanitationNetwork = placeconsumption.sanitationNetwork || false;
        this.owner = placeconsumption.owner || '';
        this.subsciber=placeconsumption.subscriber || '';
    }
}


export class Address {
    commune: string;
    wilaya:string;
    address: string;
    buildingNumber: string;
    floor: number;
    doorNumber: number;
    street: string;
    longitude: number;
    latitude: number;
    district: string;
    precisedAddress:string;

}

export class Tour {
    code: string;
    designation: string;
    positionInTour: number;
}


export class Agency {
    code: string;
    designation: string;
}

export class Commune {
    code: string;
    designation: string;
}
