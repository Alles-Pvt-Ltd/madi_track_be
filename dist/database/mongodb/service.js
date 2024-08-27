"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const helper_1 = require("./helper");
const schema_1 = require("../../modules/gs_division/schema");
class Service {
    constructor() {
        this.helper = new helper_1.default();
    }
    getFamilyCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gsDivisionId } = req.params;
                const data = yield schema_1.default.findOne({ _id: gsDivisionId });
                const families = data.family;
                const counts = families.length;
                return { err: false, data: counts };
            }
            catch (err) {
                return { err: true, data: err.message };
            }
        });
    }
    getChildrensCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsDivisionId } = req.params;
            try {
                const count = yield this.helper.countChildrens(gsDivisionId);
                if (count.length == 0) {
                    return { err: false, data: count.length };
                }
                return { err: false, data: count[0].ChildrenCount };
            }
            catch (err) {
                return { err: true, data: err.message };
            }
        });
    }
    getSeniorCitizensCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsDivisionId } = req.params;
            try {
                const count = yield this.helper.seniorCitizensCount(gsDivisionId);
                if (count.length == 0) {
                    return { err: false, data: count.length };
                }
                return { err: false, data: count[0].SeniorCitizensCount };
            }
            catch (err) {
                return { err: true, data: err.message };
            }
        });
    }
    getGovernmentEmployeesCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsDivisionId } = req.params;
            try {
                const count = yield this.helper.governmentEmployeesCount(gsDivisionId);
                if (count.length == 0) {
                    return { err: false, data: count.length };
                }
                return { err: false, data: count[0].GovermentEmployeesCount };
            }
            catch (err) {
                return { err: true, data: err.message };
            }
        });
    }
    getUniversityStudentsCount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gsDivisionId } = req.params;
            try {
                const count = yield this.helper.universityStudentsCount(gsDivisionId);
                if (count.length == 0) {
                    return { err: false, data: count.length };
                }
                return { err: false, data: count[0].totalStudents };
            }
            catch (err) {
                return { err: true, data: err.message };
            }
        });
    }
}
exports.Service = Service;
