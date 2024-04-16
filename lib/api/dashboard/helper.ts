interface IDashboardHelperData {
  familyCount?: any;
  childrensCount?: any;
  seniorCitizensCount?: any;
  governmentEmployeesCount?: any;
}

export default class Helper {
  public static dashboardResponse = (data: IDashboardHelperData) => {
    const dashboardResponse: {
      label: string;
      count:Number;
      bgColor:string;
    }[] = [];

    dashboardResponse.push({
      label:"TotalFamily",
      count:data.familyCount,
      bgColor:"#DC6B19"
    });

    dashboardResponse.push({
      label:"TotalChildrens",
      count:data.childrensCount,
      bgColor:"#DC6B19"
    })

    dashboardResponse.push({
      label:"TotalSeniorCitizens",
      count:data.seniorCitizensCount,
      bgColor:"#DC6B19"
    })

    dashboardResponse.push({
      label:"TotalGovernmentEmployees",
      count:data.governmentEmployeesCount,
      bgColor:"#DC6B19"
    })

    return dashboardResponse;
  }
}
