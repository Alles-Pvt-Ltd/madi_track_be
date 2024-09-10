
export interface IFamily {
    id?: number;
    cardNumber: number;
    familyName: string;
    address: string;
    phone: string;
    nicNo: string;
    gsDivisionId: number;
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
    familyId: string;
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