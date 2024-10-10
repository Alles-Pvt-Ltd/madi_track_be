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
Helper.singleFamilyResponse = (familyData, memberData, historyData, transferHistoryData, familyPropery) => {
    const finalFamilyData = {
        id: familyData[0].id,
        cardNumber: familyData[0].cardNumber,
        familyName: familyData[0].familyName,
        address: familyData[0].address,
        phone: familyData[0].phone,
        nicNo: familyData[0].nicNo,
        divisionName: familyData[0].divisionName,
        villageName: familyData[0].villageName,
        members: memberData,
        membersCount: memberData.length,
        history: historyData,
        transferHistory: transferHistoryData,
        familyProperties: familyPropery
    };
    return finalFamilyData;
};
Helper.memberResponse = (data) => {
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
        isMarried: data[0][0].isMarried,
        isDeath: data[0][0].isDeath,
        dateOfDeath: data[0][0].dateOfDeath,
        memberHistory: data[1],
        totalIncome: data[0][0].totalIncome,
        remark: data[0][0].remark,
        deathRemark: data[0][0].deathRemark,
        deathRemarkText: data[0][0].deathRemarkText
    };
    return memberData;
};
