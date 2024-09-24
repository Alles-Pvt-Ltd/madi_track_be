
export interface IFamily {
    id?: number;
    cardNumber: string;
    familyName: string;
    address: string;
    phone: string;
    nicNo: string;
    gsDivisionId: number;
    villageId: number
}

export interface IMember {
    id?: number;
    firstName: string;
    lastName: string;
    mobile?: string;
    email?: string;
    gender: number;
    role: number;
    dateOfBirth: string;
    nicNo?: string;
    occupation: number;
    isGovernmentEmployee: number;
    religion: number;
    isDisabledPerson: number;
    familyId: string;
    isMarried: number;
    isDeath: number;
    dateOfDeath: string;
}

export interface IHistory {
    id?: number;
    date: string;
    description: string;
    organization: string;
    familyId: number;
    createdDate: string;
    createdBy: number;
    updatedDate: string;
    updatedBy: number;
}

export interface IFamilyTransfer {
    id: number;
    familyId: number;
    oldDivision: number;
    newDivision: number;
    reason: string;
    date: string;
    status: number;
}

export interface IPropertyData {
    id: number;
    description: string;
    images: string;
    familyId: number;
}

export interface IReportData {
    searchText: string;
    ageFrom: number;
    ageTo: number;
    occupationId: number;
    jobStatusId: number;
    gsDivisionId: number;
    villageId: number;
    genderId: number;
    isMarried: number;
    religion: number;
    isDeath: number;
    deathFromDate: string;
    deathEndDate: string;
}