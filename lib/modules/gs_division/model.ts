import { ModificationNote } from "../common/model";
import mongoose from "mongoose";

export interface IUsers {
    _id?: string | mongoose.Types.ObjectId;
    name: string;
    family?: [{
        _id?: string | mongoose.Types.ObjectId,
        name: string,
        address: string,
        phone: string,
        member: [
            {
            _id?: string | mongoose.Types.ObjectId,
            name: string,
            gender: string,
            role: string,
            dob: Date,
            nic_no: string,
            occupation: string
            }
        ][],
        history?: {
            event: string,
            date: string,
            description: string
        }[]
    }][]
    gs_id?: string;
    is_deleted?: Boolean;
    modification_notes?: ModificationNote[]
}