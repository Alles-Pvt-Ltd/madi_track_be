import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    ds_divisions: [{
        name: {
            type: String,
            required: true
        }
    }],
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('district', schema);