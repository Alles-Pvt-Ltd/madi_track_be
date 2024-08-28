"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Helper {
}
exports.default = Helper;
Helper.familyResponse = (familyData, memberData) => {
    familyData.forEach(family => {
        family.members = memberData.filter(member => member.familyId === family.id);
        family.membersCount = family.members.length;
    });
    return familyData;
};
Helper.familyResponseById = (familyData, memberData) => {
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
    };
    return finalFamilyData;
};
