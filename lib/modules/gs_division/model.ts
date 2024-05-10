import { Interface } from "readline";
import { ModificationNote } from "../common/model";
import mongoose from "mongoose";

export interface IMember{
    _id?: string | mongoose.Types.ObjectId;
    name: string;
    gender: string;
    role: string;
    dob: Date;
    nic_no: string;
    occupation: string;
    is_GovernmentEmployee: boolean;
    university?: object;
}

export interface IUsers {
    _id?: string | mongoose.Types.ObjectId;
    name: string;
    family?: {
        _id?: string | mongoose.Types.ObjectId,
        name: string,
        address: string,
        phone: string,
        nicNo: string,
        member: IMember[],
        location: {
            type: object,
        },
        history?: {
            event: string,
            date: string,
            description: string
        }[]
    }[]
    gs_id?: string | mongoose.Types.ObjectId;
    is_deleted?: Boolean;
    modification_notes?: ModificationNote[]
}