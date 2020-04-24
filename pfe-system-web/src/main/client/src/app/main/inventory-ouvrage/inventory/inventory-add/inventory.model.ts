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
