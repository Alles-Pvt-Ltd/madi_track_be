import { Request, Response } from "express";

export default class Helper {

  public static familyResponse = (familyData: any, memberData: any) => {
    familyData.forEach(family => {
        family.members = memberData.filter(member => member.familyId === family.id);
        family.membersCount = family.members.length;
    });

    return familyData;
  };

  public static singleFamilyResponse = (familyData: any, memberData: any, historyData: any) => {
    const finalFamilyData = {
      id: familyData[0].id,
      cardNumber: familyData[0].cardNumber,
      familyName: familyData[0].familyName,
      address: familyData[0].address,
      phone: familyData[0].phone,
      nicNo: familyData[0].nicNo,
      divisionName: familyData[0].divisionName,
      members: memberData,
      membersCount: memberData.length,
      history: historyData
    }

    return finalFamilyData;
  };

  public static memberResponse = (data: any) => {
    const memberData = {
      id: data[0][0].id,
      firstname: data[0][0].firstname,
      lastname: data[0][0].lastname,
      mobile: data[0][0].mobile,
      email: data[0][0].email,
      gender: data[0][0].gender,
      role: data[0][0].role,
      dateOfBirth: data[0][0].dateOfBirth,
      nicNo: data[0][0].nicNo,
      occupation: data[0][0].occupation,
      isGovernmentEmployee: data[0][0].isGovernmentEmployee,
      religion: data[0][0].religion,
      isDisabledPerson: data[0][0].isDisabledPerson,
      memberHistory: data[1]
    }
    return memberData;
  }
}
