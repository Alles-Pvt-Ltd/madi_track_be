interface IDashboardHelperData {
    familyCount?: any;
    childrenCount?: any;
    eldersCount?: any;
    governmentEmployeesCount?: any;
    universityStudentsCount?: any;
  }
  
  export default class Helper {
    public static dashboardResponse = (data: IDashboardHelperData) => {
      const dashboardResponse: {
        title: string;
        count:Number;
        bgColor:string;
        imageUrl:string;
      }[] = [];
  
      dashboardResponse.push({
        title:"Total Families",
        count:data.familyCount,
        bgColor:"#DC6B19",
        imageUrl: "https://www.svgrepo.com/show/493236/family-of-3-upper-body.svg"
      });
  
      dashboardResponse.push({
        title:"Total Childrens",
        count:data.childrenCount,
        bgColor:"#FB9AD1",
        imageUrl: "https://www.svgrepo.com/show/216316/children-movement.svg"
      })
  
      dashboardResponse.push({
        title:"Total SeniorCitizens",
        count:data.eldersCount,
        bgColor:"#FA7070",
        imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png"
      })
  
      dashboardResponse.push({
        title:"Total Government Employees",
        count:data.governmentEmployeesCount,
        bgColor:"#4CCD99",
        imageUrl: "https://www.svgrepo.com/show/476911/parliament.svg"
      })
  
      dashboardResponse.push({
        title:"Total University Students",
        count:data.universityStudentsCount,
        bgColor:"#2FC6FF",
        imageUrl: "https://www.svgrepo.com/show/337727/degree-hat.svg"
      })
  
      return dashboardResponse;
    }
  }
  