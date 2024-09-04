"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
}
exports.default = Helper;
Helper.dashboardResponse = (data) => {
    const dashboardResponse = [];
    dashboardResponse.push({
        title: "Total Families",
        count: data.familyCount,
        bgColor: "#DC6B19",
        imageUrl: "https://i.ibb.co/1Gj209r/family-of-3-upper-body-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "Total Childrens",
        count: data.childrenCount,
        bgColor: "#FB9AD1",
        imageUrl: "https://i.ibb.co/yhrVz14/children-movement-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "Total SeniorCitizens",
        count: data.eldersCount,
        bgColor: "#FA7070",
        imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png"
    });
    dashboardResponse.push({
        title: "Total Government Employees",
        count: data.governmentEmployeesCount,
        bgColor: "#4CCD99",
        imageUrl: "https://i.ibb.co/tcxGy2w/employee-worker-svgrepo-com.png"
    });
    dashboardResponse.push({
        title: "Total University Students",
        count: data.universityStudentsCount,
        bgColor: "#2FC6FF",
        imageUrl: "https://i.ibb.co/qMGWzCX/graduation-academy-grad-svgrepo-com.png"
    });
    return dashboardResponse;
};
