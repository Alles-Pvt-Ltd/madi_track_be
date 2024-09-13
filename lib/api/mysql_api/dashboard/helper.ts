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
        title:"Families",
        count:data.familyCount,
        bgColor:"#DC6B19",
        imageUrl: "https://i.ibb.co/1Gj209r/family-of-3-upper-body-svgrepo-com.png"
      });
  
      dashboardResponse.push({
        title:"Childrens",
        count:data.childrenCount,
        bgColor:"#FB9AD1",
        imageUrl: "https://i.ibb.co/yhrVz14/children-movement-svgrepo-com.png"
      })
  
      dashboardResponse.push({
        title:"Senior Citizens",
        count:data.eldersCount,
        bgColor:"#FA7070",
        imageUrl: "https://i.postimg.cc/52rVGbh4/old-people.png"
      })
  
      dashboardResponse.push({
        title:"Government Employees",
        count:data.governmentEmployeesCount,
        bgColor:"#4CCD99",
        imageUrl: "https://i.ibb.co/tcxGy2w/employee-worker-svgrepo-com.png"
      })
  
      dashboardResponse.push({
        title:"University Students",
        count:data.universityStudentsCount,
        bgColor:"#2FC6FF",
        imageUrl: "https://i.ibb.co/qMGWzCX/graduation-academy-grad-svgrepo-com.png"
      })
  
      return dashboardResponse;
    }
  }
  