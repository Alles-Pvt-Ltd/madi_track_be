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
const response_1 = require("../../core/response");
const helper_1 = require("./helper");
const dashboard_1 = require("../../database/mysql/dashboard");
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
                    universityStudentsCount: dashboardCountData.data[4][0].totalUniversityStudents,
                    disabledPersonsCount: dashboardCountData.data[5][0].totalDisabledPersons,
                    totalMember: dashboardCountData.data[6][0].totalMember,
                    totalMale: dashboardCountData.data[7][0].totalMale,
                    totalFemale: dashboardCountData.data[8][0].totalFemale,
                };
                return (0, response_1.successResponse)(helper_1.default.dashboardResponse(response), "Dashboard Data Got Successfully", res);
            }
            catch (error) {
                console.error("Error while getting data, Please try after some time");
            }
        });
        this.dashboardInfo = (req, res) => {
            dashboard_1.Dashboard.getDashboardInfo()
                .then(({ err, data }) => {
                var _a, _b;
                if (err)
                    return (0, response_1.failureResponse)("Error retrieving dashboard info", res);
                const [gsDivisionData, maleGenderData, femaleGenderData, employmentData] = data;
                const maleCount = ((_a = maleGenderData === null || maleGenderData === void 0 ? void 0 : maleGenderData[0]) === null || _a === void 0 ? void 0 : _a.totalChildren) || 0;
                const femaleCount = ((_b = femaleGenderData === null || femaleGenderData === void 0 ? void 0 : femaleGenderData[0]) === null || _b === void 0 ? void 0 : _b.totalElders) || 0;
                let governmentEmployeesCount = 0;
                let nonGovernmentEmployeesCount = 0;
                console.log("Employment Data:", employmentData);
                if (employmentData && Array.isArray(employmentData)) {
                    const governmentEmployeeData = employmentData.find((item) => item.totalGovernmentEmployees !== undefined);
                    governmentEmployeesCount = (governmentEmployeeData === null || governmentEmployeeData === void 0 ? void 0 : governmentEmployeeData.totalGovernmentEmployees) || 0;
                    const nonGovernmentEmployeeData = employmentData.find((item) => item.totalNonGovernmentEmployees !== undefined);
                    nonGovernmentEmployeesCount = (nonGovernmentEmployeeData === null || nonGovernmentEmployeeData === void 0 ? void 0 : nonGovernmentEmployeeData.totalNonGovernmentEmployees) || 0;
                }
                const genderCount = { male: maleCount, female: femaleCount };
                dashboard_1.Dashboard.getDashboardInfo()
                    .then((webDashboardData) => {
                    if (webDashboardData.err)
                        return (0, response_1.failureResponse)("Error retrieving web dashboard data", res);
                    const webDashboardResponse = helper_1.default.webDashboardResponse(Object.assign(Object.assign({}, webDashboardData.data), { governmentEmployeesCount,
                        nonGovernmentEmployeesCount, totalMale: maleCount, totalFemale: femaleCount }));
                    return (0, response_1.successResponse)({
                        gsDivisionData,
                        genderCount,
                        governmentEmployeesCount,
                        nonGovernmentEmployeesCount,
                        webDashboardResponse
                    }, "Dashboard Info Retrieved Successfully", res);
                })
                    .catch(() => (0, response_1.failureResponse)("Error retrieving web dashboard data", res));
            })
                .catch(() => (0, response_1.failureResponse)("Error retrieving dashboard info", res));
        };
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
