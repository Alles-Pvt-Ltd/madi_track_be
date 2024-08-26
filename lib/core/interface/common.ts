
export interface IFamily {
    id?: number;
    cardNumber: string;
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
    mobile: string;
    email: string;
    gender: string;
    role: string;
    dateOfBirth: string;
    nicNo: string;
    occupation: string;
    isGovernmentEmployee: number;
    familyId: string;
}