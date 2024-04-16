import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';
import { IUsers } from './model';

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: {
        type: String,
        required:  true
    },
    gender: {
        type: String, 
        enum: ['male', 'female', 'other'], 
        required: true 
    },
    role: {
        type: String,
        required:  true
    },
    dob: {
        type: Date,
        required: true
    },
    nic_no: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    is_GovernmentEmployee : {
        type: Boolean,
        default: false
    }
})

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    family: [{
        name: {
        type: String,
        required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        member: [memberSchema],
        location: {
            type: Object
        },
        history: [
           {event: String}, 
           {date: Date},
           {description: String} 
        ]
    }],
    gs_id: {
        type: Schema.Types.ObjectId,
        ref: 'gs',
        // required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('gs_divisions', schema);