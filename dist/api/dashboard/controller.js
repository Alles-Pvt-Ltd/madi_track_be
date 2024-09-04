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
const service_1 = require("../../modules/common/service");
const helper_1 = require("./helper");
const service_2 = require("../../database/mongodb/service");
const { exec } = require('child_process');
class DashboardController {
    constructor() {
        // private helper: Helper = new Helper();
        this.service = new service_2.Service();
        this.dashboardList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { gsDivisionId } = req.params;
                const response = {};
                const getFamilyCount = yield this.service.getFamilyCount(req, res);
                if (!getFamilyCount.err) {
                    response.familyCount = getFamilyCount.data;
                }
                const getChildrensCount = yield this.service.getChildrensCount(req, res);
                if (!getChildrensCount.err) {
                    response.childrensCount = getChildrensCount.data;
                }
                const getSeniorCitizensCount = yield this.service.getSeniorCitizensCount(req, res);
                if (!getSeniorCitizensCount.err) {
                    response.seniorCitizensCount = getSeniorCitizensCount.data;
                }
                const getGovernmentEmployeesCount = yield this.service.getGovernmentEmployeesCount(req, res);
                if (!getGovernmentEmployeesCount.err) {
                    response.governmentEmployeesCount = getGovernmentEmployeesCount.data;
                }
                const getUniversityStudentsCount = yield this.service.getUniversityStudentsCount(req, res);
                if (!getUniversityStudentsCount.err) {
                    response.universityStudentsCount = getUniversityStudentsCount.data;
                }
                if (Object.keys(response).length === 0) {
                    return (0, service_1.failureResponse)("No data available for dashboard", null, res);
                }
                const responseData = helper_1.default.dashboardResponse(response);
                // {
                // familyCount: getFamilyCount.data,
                // childrensCount: getChildrensCount.data,
                // seniorCitizensCount: getSeniorCitizensCount.data,
                // governmentEmployeesCount: getGovernmentEmployeesCount.data,
                // universityStudentsCount: getUniversityStudentsCount.data
                // });
                return (0, service_1.successResponse)('Dashboard Data Get Successfully', responseData, res);
            }
            catch (err) {
                return (0, service_1.failureResponse)('Error fetching dashboard data', err.message, res);
            }
        });
        this.deployment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            exec('sh deploy.sh', (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr);
                if (error !== null) {
                    return (0, service_1.failureResponse)('Error fetching dashboard data', error.message, res);
                }
                return (0, service_1.successResponse)("Deployment done...", {}, res);
            });
        });
    }
}
exports.DashboardController = DashboardController;
