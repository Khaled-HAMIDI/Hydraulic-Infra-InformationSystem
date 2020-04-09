export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    employeeCode: string;
    email: string;
    phoneNumber: string;
    structure: UserStructure;
    enabled: boolean;
    roles: Role[];


    /**
     * Constructor
     *
     * @param user
     */
    constructor(user?) {
        user = user || {};
        this.id = user.id || '';
        this.username = user.username || '';
        this.firstName = user.firstName || '';
        this.lastName = user.lastName || '';
        this.employeeCode = user.employeeCode || '';
        this.email = user.email || '';
        this.phoneNumber = user.phoneNumber || '';
        this.enabled = user.enabled;
        this.structure = user.structure || null;
        this.roles = user.roles || [];
    }
}

export class UserStructure {
    id: string;
    type: string;
    designation: string;
    parentStructure: UserStructure;

    constructor(userStructure) {
        this.type = userStructure.type;
        this.designation = userStructure.designation;
        this.parentStructure = userStructure.parentStructure;
    }
}

export class Structure {
    id: string;
    code: string;
    address: string;
    designation: string;
    headOfTheStructure: any;
    phone: string;
    email: string;
    latitude: number;
    longitude: number;

    fax                    : string;
    rib                    : string;
    rip                    : string;
    taxIdNumber            : string;
    thirdPartyCode         : string;
    bankOfDomiciliation    : string;
    businessRegisterNumber : string;
    taxIdentificationNumber: string;

    constructor(structure?) {
        structure = structure || {};
        this.id = structure.id || '';
        this.code = structure.code || '';
        this.address = structure.address || '';
        this.designation = structure.designation || '';
        this.headOfTheStructure = structure.headOfTheStructure || {};
        this.phone = structure.phone || '';
        this.email = structure.email || '';
        this.latitude = structure.latitude || '';
        this.longitude = structure.longitude || '';

        this.fax                     = structure.fax                     || '';
        this.rib                     = structure.rib                     || '';
        this.rip                     = structure.rip                     || '';
        this.taxIdNumber             = structure.taxIdNumber             || '';
        this.thirdPartyCode          = structure.thirdPartyCode          || '';
        this.bankOfDomiciliation     = structure.bankOfDomiciliation     || '';
        this.businessRegisterNumber  = structure.businessRegisterNumber  || '';
        this.taxIdentificationNumber = structure.taxIdentificationNumber || '';
    }
}

export class Center extends Structure {
    constructor(center?) {
        center = center || {};
        super(center);
    }
}

export class Unit extends Structure {
    constructor(unit?) {
        unit = unit || {};
        super(unit);
    }
}

export class Role {
    id: string;
    role: string;
    designation: string;
    authorities: Authority[];
    creationDate: string;
    lastModifiedDate: string;
    systemEntity: boolean;

    constructor(role?) {
        role = role || {};
        this.id = role.id || '';
        this.role = role.role || '';
        this.designation = role.designation || '';
        this.authorities = role.authorities || [];
        this.creationDate = role.creationDate || '';
        this.lastModifiedDate = role.lastModifiedDate || '';
        this.systemEntity = role.systemEntity || undefined;
    }
}

export class Authority {
    id: string;
    description: string;

    constructor(authority?) {
        authority = authority || {};
        this.id = authority.id || '';
        this.description = authority.description || '';
    }
}

export class Login {
    username: string;
    password: string;

    constructor(loginValues) {
        this.username = loginValues.username || '';
        this.password = loginValues.password || '';
    }
}

export class LoginResponse {
    access_token: string;
    passwordChanged: boolean;

    constructor(loginResponse) {
        this.access_token = loginResponse.access_token || '';
        this.passwordChanged = loginResponse.passwordChanged || false;
    }
}

export class CashBoxList {
    id: string;
    code: string;
    designation: string;
    enabled: boolean;
    agency: string;

    constructor(cashBox?) {
        cashBox = cashBox || {};
        this.id = cashBox.id || '';
        this.code = cashBox.code || '';
        this.designation = cashBox.designation || '';
        this.enabled = cashBox.enabled;
        this.agency = cashBox.agency || '';
    }
}

export class CashBoxOne {
    id: string;
    code: string;
    designation: string;
    enabled: boolean;
    agency: CashBoxAgency;
    hardwareId: String;

    constructor(cashBox?) {
        cashBox = cashBox || {};
        this.id = cashBox.id || '';
        this.code = cashBox.code || '';
        this.designation = cashBox.designation || '';
        this.enabled = cashBox.enabled;
        this.agency = cashBox.agency || {};
        this.hardwareId = cashBox.hardwareId || '';
    }
}

export class CashBoxAgency {
    id: string;
    code: string;
    designation: string;
}

export class CashBoxAddUpdate {
    id: string;
    code: string;
    designation: string;
    enabled: boolean;
    agency: string;
    hardwareId: string;

    constructor(cashBox?) {
        cashBox = cashBox || {};
        this.id = cashBox.id || '';
        this.code = cashBox.code || '';
        this.designation = cashBox.designation || '';
        this.enabled = cashBox.enabled;
        this.agency = cashBox.agency || '';
        this.hardwareId = cashBox.hardwareId || '';
    }
}

export interface IDistrict {
    id: number;
    code: string;
    designation: string;
}

export interface IStreet {
    id: number;
    code: string;
    designation: string;
}
