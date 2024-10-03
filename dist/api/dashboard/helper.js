"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
    static graphData(gsDivisionData, genderData, totalFamiliesData) {
        var _a, _b, _c;
        const division = ((_a = gsDivisionData[0]) === null || _a === void 0 ? void 0 : _a.gsDivisionName) || "";
        const count = ((_b = gsDivisionData[0]) === null || _b === void 0 ? void 0 : _b.total) || 0;
        const maleData = genderData.find(g => g.gender === 3) || { count: 0 };
        const femaleData = genderData.find(g => g.gender === 4) || { count: 0 };
        const maleCount = maleData.count || 0;
        const femaleCount = femaleData.count || 0;
        const totalFamiliesCount = ((_c = totalFamiliesData[0]) === null || _c === void 0 ? void 0 : _c.totalFamilies) || 0;
        return {
            gsDivisionGraphData: [{ division, count }],
            genderGraphData: [
                { label: "Male", value: maleCount },
                { label: "Female", value: femaleCount }
            ],
            familiesGraphData: [{ division: "Total", count: totalFamiliesCount }],
        };
    }
    static graphDashboardResponse(gsDivisionData, genderData, totalFamiliesData) {
        const graphData = this.graphData(gsDivisionData, genderData, totalFamiliesData);
        return {
            graphTitle: "Dashboard Information",
            charts: [
                {
                    chartType: "line",
                    name: "GS Division Wise Count",
                    xAxis: "GS Division",
                    yAxis: "Number of People",
                    data: graphData.gsDivisionGraphData,
                },
                {
                    chartType: "bar",
                    name: "Gender Distribution",
                    xAxis: "Gender",
                    yAxis: "Number of People",
                    data: graphData.genderGraphData,
                },
                {
                    chartType: "pie",
                    name: "Total Families Count",
                    data: graphData.familiesGraphData,
                },
            ]
        };
    }
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
    const items = [
        { title: "Families", count: data.familyCount, bgColor: "#DC6B19", imageUrl: "https://i.ibb.co/1Gj209r/family-of-3-upper-body-svgrepo-com.png" },
        { title: "Children", count: data.childrenCount, bgColor: "#FB9AD1", imageUrl: "https://i.ibb.co/yhrVz14/children-movement-svgrepo-com.png" },
        { title: "Senior Citizens", count: data.eldersCount, bgColor: "#FA7070", imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png" },
        { title: "Government Employees", count: data.governmentEmployeesCount, bgColor: "#4CCD99", imageUrl: "https://i.ibb.co/tcxGy2w/employee-worker-svgrepo-com.png" },
        { title: "University Students", count: data.universityStudentsCount, bgColor: "#2FC6FF", imageUrl: "https://i.ibb.co/qMGWzCX/graduation-academy-grad-svgrepo-com.png" }
    ];
    return items;
};
