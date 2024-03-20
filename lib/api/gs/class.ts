import { check } from "express-validator";

export class Validation {
  // login
  public loginValidation = [
    //check("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number1').isInt().withMessage('data type should be integer').isLength({ min: 9 ,max:10 }).withMessage('phone number lenth incorrect').optional({ nullable: true }),
    check("email").isEmail().notEmpty().withMessage('Enter valid email').optional({ nullable: false }),
    check("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
  ];

  // register / add user
  public registerValidation = [
    check("name").notEmpty().withMessage('username is required').isString().withMessage('data type should be string'),
    check("email").notEmpty().withMessage('email is required').isEmail().withMessage('Enter valid email'),
    check("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5')
  ];

//   update user
public updateUserValidation = [
  // check("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
  check("first_name").isString().withMessage('first_name data type should be string').optional({ nullable: true }),
  check("last_name").isString().withMessage('last_name data type should be string').optional({ nullable: true }),
  check("email").isEmail().withMessage('Enter valid email').optional({ nullable: true }),
  check("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number1').isInt().withMessage('data type should be integer').isLength({ min: 9 ,max:10 }).withMessage('phone number lenth incorrect').optional({ nullable: true }),
  check("roleId").isInt().withMessage('roleId type should integer').optional({ nullable: true }),
  check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
  check("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
  check("is_role_deleted").isBoolean().withMessage('is_role_deleted type should boolean').optional({ nullable: true })
];
}
