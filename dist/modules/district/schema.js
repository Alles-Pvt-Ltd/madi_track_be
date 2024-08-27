"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
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
            },
            gs_divisions_id: [{
                    type: Schema.Types.ObjectId,
                    ref: "gs_divisions"
                }],
            is_deleted: {
                type: Boolean,
                default: false
            }
        }],
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('district', schema);
