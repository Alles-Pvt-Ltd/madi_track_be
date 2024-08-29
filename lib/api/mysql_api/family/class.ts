import { check } from "express-validator";

export class Validation {

  public static addFamilyValidation = [
    check("cardNumber").notEmpty().withMessage("CardNumber is required"),
    check("familyName").notEmpty().withMessage("FamilyName is required"),
    check("address").notEmpty().withMessage("Address is required"),
    check("phone").notEmpty().withMessage("Phone is required"),
    check("nicNo").notEmpty().withMessage("NIC number is required"),
    check("gsDivisionId").notEmpty().withMessage("Gs division is required"),
  ];

  public static addMemberValidation = [
    check("firstName").notEmpty().withMessage("Firstname is required"),
    check("lastName").notEmpty().withMessage("Lastname is required"),
    check("mobile").notEmpty().withMessage("Mobile is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("role").notEmpty().withMessage("Role is required"),
    check("dateOfBirth").notEmpty().withMessage("Date Of Birth is required"),
    check("nicNo").notEmpty().withMessage("NIC number is required"),
    check("occupation").notEmpty().withMessage("Occupation is required"),
    check("familyId").notEmpty().withMessage("Family Id is required")
  ];

  public static updateMemberValidation = [
    check("firstName").notEmpty().withMessage("Firstname is required"),
    check("lastName").notEmpty().withMessage("Lastname is required"),
    check("mobile").notEmpty().withMessage("Mobile is required"),
    check("email").notEmpty().withMessage("Email is required"),
    check("gender").notEmpty().withMessage("Gender is required"),
    check("role").notEmpty().withMessage("Role is required"),
    check("dateOfBirth").notEmpty().withMessage("Date Of Birth is required"),
    check("nicNo").notEmpty().withMessage("NIC number is required"),
    check("occupation").notEmpty().withMessage("Occupation is required"),
    check("isGovernmentEmployee").notEmpty().withMessage("Government Employee detail is required")
  ];

  public static familyHistoryValidation = [
    check("date").notEmpty().withMessage("Date is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("organization").notEmpty().withMessage("Organization is required"),
    check("familyId").notEmpty().withMessage("Family Id is required")


  ];
}
