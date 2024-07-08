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
    },
    university: {
        name: String,
        course: String
    }
})

const schema = new Schema<IUsers>({
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
        nicNo: {
            type: String,
            // required: true,
            // unique: true
        },
        member: [memberSchema],
        lat : {
            type: Number,
            // required: true
        },
        lon : {
            type: Number,
            // required: true
        },
        geoLocation: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
                required: true
              },
              coordinates: {
                type: [Number],
                required: true
              }
          },
        history: [
           {
            date: Date,
            description: String,
            organization: String,
           }
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

schema.index({ geoLocation: '2dsphere' });

export default mongoose.model('gs_divisions', schema);