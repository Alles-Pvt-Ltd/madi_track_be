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
        imageUrl: "https://bitbucket.org/allespl/images/raw/dfc9664ff1570e729c5073de52fc9f51aaa4b6a7/Pripaid.png"
    });
    dashboardResponse.push({
        title: "Total Childrens",
        count: data.childrensCount,
        bgColor: "#FB9AD1",
        imageUrl: "https://i.postimg.cc/wx59vKm2/children.png"
    });
    dashboardResponse.push({
        title: "Total SeniorCitizens",
        count: data.seniorCitizensCount,
        bgColor: "#FA7070",
        imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png"
    });
    dashboardResponse.push({
        title: "Total Government Employees",
        count: data.governmentEmployeesCount,
        bgColor: "#4CCD99",
        imageUrl: "https://i.postimg.cc/KvZx3972/governmentemployee.png"
    });
    dashboardResponse.push({
        title: "Total University Students",
        count: data.universityStudentsCount,
        bgColor: "#2FC6FF",
        imageUrl: "https://i.postimg.cc/GmtRqHSg/university-student.png"
    });
    return dashboardResponse;
};
