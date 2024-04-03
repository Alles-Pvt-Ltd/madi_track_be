import { ModificationNote } from "../common/model";
import mongoose from "mongoose";

export interface IDivision{
    _id?: string | mongoose.Types.ObjectId;
    name: string;
    gs_divisions_id:[mongoose.Types.ObjectId],
    is_deleted?: Boolean;
}

export interface IDistrict {
    _id?: string | mongoose.Types.ObjectId;
    name: string;
    ds_divisions?:[IDivision];
    is_deleted?: Boolean;
    modification_notes?: ModificationNote[]
}