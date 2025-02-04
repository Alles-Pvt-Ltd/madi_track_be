import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
import { IUser } from './model';

const Schema = mongoose.Schema;

const schema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    gs_division_id: {
        type: Schema.Types.ObjectId,
        ref: "gs_divisions",
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('gs', schema);