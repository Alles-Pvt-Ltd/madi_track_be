import { Request, Response } from "express";

export default class Helper {
  public static familyResponse = (familyData: any, memberData: any) => {
    return familyData.map(family => {
      const members = memberData.filter(member => member.familyId === family.id).map(member => ({
        id: member.id,
        firstname: member.firstname,
        lastname: member.lastname,
        mobile: member.mobile,
        email: member.email,
        gender: member.gender,
        role: member.role,
        dateOfBirth: member.dateOfBirth,
        nicNo: member.nicNo,
        occupation: member.occupation,
        isGovernmentEmployee: member.isGovernmentEmployee
      }));

      return {
        id: family.id,
        cardNumber: family.cardNumber,
        familyName: family.familyName,
        address: family.address,
        phone: family.phone,
        nicNo: family.nicNo,
        divisionName: family.divisionName,
        members: members,
        membersCount: members.length
      };
    });
  };
}
