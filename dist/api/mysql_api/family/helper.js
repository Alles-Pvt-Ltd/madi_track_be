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
