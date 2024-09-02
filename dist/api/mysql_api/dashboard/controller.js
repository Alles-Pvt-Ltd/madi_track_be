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
exports.DashboardController = void 0;
const response_1 = require("../../../core/response");
const helper_1 = require("./helper");
const dashboard_1 = require("../../../database/mysql/dashboard");
class DashboardController {
    constructor() {
        this.dashboardList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gsDivisionId = parseInt(req.params.divisionId);
            try {
                const familiesCount = yield dashboard_1.Dashboard.getFamiliesCount(gsDivisionId);
                const childrenCount = yield dashboard_1.Dashboard.getChildrenCount(gsDivisionId);
                const eldersCount = yield dashboard_1.Dashboard.getEldersCount(gsDivisionId);
                const governmentEmployeesCount = yield dashboard_1.Dashboard.getGovernmentEmployeesCount(gsDivisionId);
                const universityStudentsCount = yield dashboard_1.Dashboard.getUniversityStudentsCount(gsDivisionId);
                const response = {
                    familyCount: familiesCount.data[0].totalFamilies,
                    childrenCount: childrenCount.data[0].totalChildren,
                    eldersCount: eldersCount.data[0].totalElders,
                    governmentEmployeesCount: governmentEmployeesCount.data[0].totalGovernmentEmployees,
                    universityStudentsCount: universityStudentsCount.data[0].totalUniversityStudents
                };
                return (0, response_1.successResponse)(helper_1.default.dashboardResponse(response), "Dashboard Data Got Successfully", res);
            }
            catch (error) {
                console.error("Error while getting data, Please try after some time");
            }
        });
    }
}
exports.DashboardController = DashboardController;
