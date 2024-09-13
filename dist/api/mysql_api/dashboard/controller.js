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
const { exec } = require('child_process');
class DashboardController {
    constructor() {
        this.dashboardList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const gsDivisionId = parseInt(req.params.divisionId);
            try {
                const dashboardCountData = yield dashboard_1.Dashboard.getDashboardData(gsDivisionId);
                const response = {
                    familyCount: dashboardCountData.data[0][0].totalFamilies,
                    childrenCount: dashboardCountData.data[1][0].totalChildren,
                    eldersCount: dashboardCountData.data[2][0].totalElders,
                    governmentEmployeesCount: dashboardCountData.data[3][0].totalGovernmentEmployees,
                    universityStudentsCount: dashboardCountData.data[4][0].totalUniversityStudents
                };
                return (0, response_1.successResponse)(helper_1.default.dashboardResponse(response), "Dashboard Data Got Successfully", res);
            }
            catch (error) {
                console.error("Error while getting data, Please try after some time");
            }
        });
        this.deployment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            exec('sh deploy.sh', (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    return (0, response_1.failureResponse)(error.message, res);
                }
                return (0, response_1.successResponse)({ message: "Deployment done..." }, "", res);
            });
        });
    }
}
exports.DashboardController = DashboardController;
