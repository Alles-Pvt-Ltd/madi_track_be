import { Request, Response } from "express";


export default class Helper {
  public static familyResponse = (familyData: any, memberData: any) => {
    familyData.forEach(family => {
        family.members = memberData.filter(member => member.familyId === family.id);
        family.membersCount = family.members.length;
    });

    return familyData;
  };
}
