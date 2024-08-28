import { Request, Response } from "express";

export default class Helper {

  public static familyResponse = (familyData: any, memberData: any) => {
    familyData.forEach(family => {
        family.members = memberData.filter(member => member.familyId === family.id);
        family.membersCount = family.members.length;
    });

    return familyData;
  };

  public static singleFamilyResponse = (familyData: any, memberData: any) => {
    const finalFamilyData = {
      id: familyData[0].id,
      cardNumber: familyData[0].cardNumber,
      familyName: familyData[0].familyName,
      address: familyData[0].address,
      phone: familyData[0].phone,
      nicNo: familyData[0].nicNo,
      divisionName: familyData[0].divisionName,
      members: memberData,
      membersCount: memberData.length
    }

    return finalFamilyData;
  };
}
