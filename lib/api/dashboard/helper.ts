interface IDashboardHelperData {
  familyCount?: any;
  childrensCount?: any;
  seniorCitizensCount?: any;
  governmentEmployeesCount?: any;
  universityStudentsCount?: any;
}

export default class Helper {
  public static dashboardResponse = (data: IDashboardHelperData) => {
    const dashboardResponse: {
      title: string;
      count:Number;
      bgColor:string;
    }[] = [];

    dashboardResponse.push({
      title:"Total Families",
      count:data.familyCount,
      bgColor:"#DC6B19"
    });

    dashboardResponse.push({
      title:"Total Childrens",
      count:data.childrensCount,
      bgColor:"#FB9AD1"
    })

    dashboardResponse.push({
      title:"Total SeniorCitizens",
      count:data.seniorCitizensCount,
      bgColor:"#FA7070"
    })

    dashboardResponse.push({
      title:"Total Government Employees",
      count:data.governmentEmployeesCount,
      bgColor:"#4CCD99"
    })

    dashboardResponse.push({
      title:"Total University Students",
      count:data.universityStudentsCount,
      bgColor:"#FB9AD1"
    })

    return dashboardResponse;
  }
}
