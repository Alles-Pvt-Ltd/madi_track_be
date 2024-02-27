import { check } from "express-validator";

export class Validation {
  // login
  public loginValidation = [
    check("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number1').isInt().withMessage('data type should be integer').isLength({ min: 9 ,max:10 }).withMessage('phone number lenth incorrect').optional({ nullable: true }),
    // check("email").isEmail().withMessage('Enter valid email').optional({ nullable: true }),
    check("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
  ];

  // register / add user
  public registerValidation = [
    // check("name").notEmpty().withMessage('username is required').isString().withMessage('data type should be string'),
    check("password").notEmpty().withMessage('password is required').isLength({ min: 5 }).withMessage('password minimum charactors 5'),
    check("first_name").notEmpty().withMessage('first_name is required').isString().withMessage('data type should be string'),
    check("last_name").notEmpty().withMessage('last_name is required').isString().withMessage('data type should be string'),
    check("email").notEmpty().withMessage('email is required').isEmail().withMessage('Enter valid email'),
    check("mobile").not().custom((val) => /[^+0-9\s]/g.test(val)).withMessage('enter valid phone number').notEmpty().withMessage('mobile number is required').isInt().withMessage('data type should be integer').isLength({ min: 9 ,max:10 }).withMessage('phonew number lenth incorrect'),
    // check("roleId").notEmpty().withMessage('roleId is required').isInt().withMessage('type should integer'),
    // checkBody('partnerid', 'Partnerid field must be 5 character long ').
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

  // register / add role
  public addRoleValidation = [
    check("name").notEmpty().withMessage('role is required').isString().withMessage('data type should be string'),
  ];

  //   update role
public updateRoleValidation = [
  check("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
  check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
];


 // register / add ezlanka_provider
 public addEz_lanka_providerValidation = [
  check("name").notEmpty().withMessage('provider name is required').isString().withMessage('data type should be string'),
  check("op_code").notEmpty().withMessage('op_code is required').isString().withMessage('data type should be string'),
];

  //   update ezlanka_provider
  public updateEz_lanka_providerValidation = [
    check("name").isString().withMessage('name data type should be string').optional({ nullable: true }),
    check("op_code").isString().withMessage('op_code data type should be string').optional({ nullable: true }),
    check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
  ];

   // register / add service
 public addServiceValidation = [
  check("name").notEmpty().withMessage('services name is required').isString().withMessage('data type should be string'),
  // check("service_code").notEmpty().withMessage('service_code is required').isString().withMessage('data type should be string'),
];

  //   update service
  public updateServiceValidation = [
    check("name").isString().withMessage('services name data type should be string').optional({ nullable: true }),
    // check("service_code").isString().withMessage('service_code data type should be string').optional({ nullable: true }),
    check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
    check("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
  ];

     // register / add service type
 public addTypeValidation = [
  check("name").notEmpty().withMessage('type name is required').isString().withMessage('data type should be string'),
  // check("type_code").notEmpty().withMessage('type_code is required').isString().withMessage('data type should be string'),
];

  //   update type type
  public updateTypeValidation = [
    check("name").isString().withMessage('type name data type should be string').optional({ nullable: true }),
    // check("type_code").isString().withMessage('type_code data type should be string').optional({ nullable: true }),
    check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
    check("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),

  ];

  // register / add provider
 public addProviderValidation = [
  check("type_code").notEmpty().withMessage('type provider type_code is required').isString().withMessage('data type should be string'),
  check("ezlanka_provider_code").notEmpty().withMessage('type provider ezlanka_provider_code is required').isString().withMessage('data type should be string'),
  // check("provider_code").notEmpty().withMessage('provider_code is required').isString().withMessage('data type should be string'),
  check("provider_percentage").notEmpty().withMessage('provider_percentage is required').isNumeric().withMessage('data type should be double'),
];

  //   update provider
  public updateProviderValidation = [
    check("type_code").isString().withMessage('data type should be string').optional({ nullable: true }),
    check("ezlanka_provider_code").isString().withMessage('data type should be string').optional({ nullable: true }),
    // check("provider_code").isString().withMessage('data type should be string').optional({ nullable: true }),
    check("is_deleted").isBoolean().withMessage('is_deleted type should boolean').optional({ nullable: true }),
    check("is_enabled").isBoolean().withMessage('is_enabled type should boolean').optional({ nullable: true }),
    check("provider_percentage").isNumeric().withMessage('provider_percentage type should boolean').optional({ nullable: true }),

  ];

   // register / add package
 public addPackageValidation = [
  // check("provider_code").notEmpty().withMessage('provider code is required').isString().withMessage('data type should string'),
  check("package.provider_percentage").notEmpty().withMessage('provider percentage is required').isNumeric().withMessage('data type should be int or double'),
  check("package.admin_gave_commission_to_distibutor").notEmpty().withMessage('provider_percentage is required').isNumeric().withMessage('data type should be int or double'),
];
}

