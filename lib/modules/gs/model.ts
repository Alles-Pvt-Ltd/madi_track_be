import mongoose from "mongoose";
import { ModificationNote } from "../common/model";

export interface IUser {
    _id?: String;
    name: String;
    email: String;
    password: String;
    phone: number;
    gs_division_id: string | mongoose.Types.ObjectId;
    is_deleted?: Boolean;
    modification_notes?: ModificationNote[]
}