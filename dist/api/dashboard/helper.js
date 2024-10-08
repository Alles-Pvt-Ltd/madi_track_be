"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
}
exports.default = Helper;
Helper.dashboardResponse = (data) => {
    const dashboardResponse = [];
    dashboardResponse.push({
        title: "Families",
        count: data.familyCount,
        bgColor: "#DC6B19",
        imageUrl: "https://i.ibb.co/1Gj209r/family-of-3-upper-body-svgrepo-com.png"
    });
    //Family Related Start
    dashboardResponse.push({
        title: "Total member",
        count: data.totalMember,
        bgColor: "#f5bf42",
        imageUrl: "https://i.ibb.co/HG7nSVh/team.png"
    });
    dashboardResponse.push({
        title: "Male",
        count: data.totalMale,
        bgColor: "#e967f0",
        imageUrl: "https://i.ibb.co/dbrK8Qn/avatar.png"
    });
    dashboardResponse.push({
        title: "Female",
        count: data.totalFemale,
        bgColor: "#52d9e3",
        imageUrl: "https://i.ibb.co/0t4qqyL/woman.png"
    });
    //Family Related End
    dashboardResponse.push({
        title: "Childrens",
        count: data.childrenCount,
        bgColor: "#FB9AD1",
        imageUrl: "https://i.ibb.co/yhrVz14/children-movement-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "Senior Citizens",
        count: data.eldersCount,
        bgColor: "#FA7070",
        imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png"
    });
    dashboardResponse.push({
        title: "Government Employees",
        count: data.governmentEmployeesCount,
        bgColor: "#4CCD99",
        imageUrl: "https://i.ibb.co/tcxGy2w/employee-worker-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "University Students",
        count: data.universityStudentsCount,
        bgColor: "#2FC6FF",
        imageUrl: "https://i.ibb.co/qMGWzCX/graduation-academy-grad-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "Disabled Persons",
        count: data.disabledPersonsCount,
        bgColor: "#FF6600",
        imageUrl: "https://i.ibb.co/syt0bjf/man-in-motorized-wheelchair-svgrepo-com.png"
    });
    return dashboardResponse;
};
Helper.webDashboardResponse = (data) => {
    return [
        { title: "Families", count: data.familyCount, bgColor: "#DC6B19", imageUrl: "https://i.ibb.co/1Gj209r/family-of-3-upper-body-svgrepo-com.png" },
        { title: "Children", count: data.childrenCount, bgColor: "#FB9AD1", imageUrl: "https://i.ibb.co/yhrVz14/children-movement-svgrepo-com.png" },
        { title: "Senior Citizens", count: data.eldersCount, bgColor: "#FA7070", imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png" },
        { title: "Government Employees", count: data.governmentEmployeesCount, bgColor: "#4CCD99", imageUrl: "https://i.ibb.co/tcxGy2w/employee-worker-svgrepo-com.png" },
        { title: "University Students", count: data.universityStudentsCount, bgColor: "#2FC6FF", imageUrl: "https://i.ibb.co/qMGWzCX/graduation-academy-grad-svgrepo-com.png" },
        { title: "Disabled Persons", count: data.disabledPersonsCount, bgColor: "#FF6600", imageUrl: "https://i.ibb.co/syt0bjf/man-in-motorized-wheelchair-svgrepo-com.png" },
        { title: "Total Members", count: data.totalMember, bgColor: "#f5bf42", imageUrl: "https://i.ibb.co/HG7nSVh/team.png" },
        { title: "Male", count: data.totalMale, bgColor: "#e967f0", imageUrl: "https://i.ibb.co/dbrK8Qn/avatar.png" },
        { title: "Female", count: data.totalFemale, bgColor: "#52d9e3", imageUrl: "https://i.ibb.co/0t4qqyL/woman.png" }
    ];
};
Helper.graphDashboardResponse = (gsDivisionData, genderCount, additionalData) => {
    var _a, _b, _c, _d, _e, _f;
    return {
        chartData: [
            { name: "Family Count", value: ((_a = gsDivisionData[0]) === null || _a === void 0 ? void 0 : _a.totalFamilies) || 0 },
            { name: "Children Count", value: ((_b = gsDivisionData[1]) === null || _b === void 0 ? void 0 : _b.totalChildren) || 0 },
            { name: "Elders Count", value: ((_c = gsDivisionData[2]) === null || _c === void 0 ? void 0 : _c.totalElders) || 0 },
            { name: "Government Employees", value: ((_d = gsDivisionData[3]) === null || _d === void 0 ? void 0 : _d.totalGovernmentEmployees) || 0 },
            { name: "University Students", value: ((_e = gsDivisionData[4]) === null || _e === void 0 ? void 0 : _e.totalUniversityStudents) || 0 },
            { name: "Disabled Persons", value: ((_f = gsDivisionData[5]) === null || _f === void 0 ? void 0 : _f.totalDisabledPersons) || 0 }
        ],
        genderData: [
            { name: "Male", value: genderCount.male },
            { name: "Female", value: genderCount.female }
        ],
    };
};
