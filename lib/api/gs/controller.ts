import { Request, Response } from 'express';
import { insufficientParameters, mongoError,validationError, successResponse, failureResponse, notFound, DatanotFound, forbidden } from '../../modules/common/service';
import { IUser } from '../../modules/gs/model';
import { IUsers, IMember } from '../../modules/gs_division/model';
import UserService from '../../modules/gs/service';
import FamilyService from '../../modules/gs_division/service';
import { StringConstant } from '../../config/constant';
import { AppFucntion } from '../../app/app_function';
import GsDivision from '../../modules/gs_division/schema';
import { validationResult } from "express-validator";

export class UserController {

    private userService: UserService = new UserService();
    private familyService: FamilyService = new FamilyService();
    private stringConstant:StringConstant = new StringConstant();

    public async userRegistration(req: Request, res: Response) {
        const validation = await validationResult(req).array(); //here we validate user request before create post

        // if we have validation error
        if (validation[0]) {
            return validationError(validation[0].msg, req.body, res);
        }
            const user_params: IUser = {
                name: req.body.name,
                email: req.body.email,
                password: AppFucntion.encryptPassword(req.body.password),
                gs_division_id: req.body.gs_division_id,
                modification_notes: [{
                    modified_on: new Date(Date.now()),
                    modified_by: null,
                    modification_note: 'New user created'
                }]
            };
            this.userService.createUser(user_params, (err: any, user_data: IUser) => {
                if (err) {
                    if (err.code === 11000 && err.keyPattern && err.keyValue.email)
                    {
                        return forbidden('Email is Already registered',user_data,res);
                    }
                    else{
                        return mongoError(err, res);
                    }
                    
                }
                 else {
                    const responseData = {
                        name: user_data.name,
                        email: user_data.email,
                        gs_division_id: user_data.gs_division_id,
                        modification_notes: user_data.modification_notes
                    }
                    return successResponse('create user successfull', responseData, res);
                }
            });
    }

    public async login(req:Request, res:Response){
        const validation = await validationResult(req).array(); //here we validate user request before create post

        // if we have validation error
        if (validation[0]) {
            return validationError(validation[0].msg, req.body, res);
        }
        
        const {email,password} = req.body;
            this.userService.filterUser({email}, (err:any,sys_da:any) => {
                if (err) {
                  return err;
                } else {
                  if (!sys_da) {
                    return notFound(sys_da, res);
                  }
                  const comparePassword = AppFucntion.passwordVerify(password,sys_da.password)
                  if(!comparePassword)
                  {
                      return forbidden(this.stringConstant.passwordMissMatch, null, res);
                  }

                  const token = AppFucntion.createJwtToken(sys_da._id,sys_da.name)
                  if(token)
                  {
                      const responseData = {
                          _id: sys_da._id,
                          name: sys_da.name,
                          email: sys_da.email,
                          gs_division_id: sys_da.gs_division_id,
                          modification_notes: sys_da.modification_notes
                      }
                      return successResponse("login successfull", responseData, res);
                      
                  }
                  
              }
            })  
    }

    public async addFamily(req: Request, res: Response) {
        const { divisionId } = req.params;
        try {
            const gsDivision = await GsDivision.findById(divisionId);
            if (!gsDivision) {
            return notFound;
            }
            gsDivision.family.push(req.body);
            await gsDivision.save();
            return successResponse('Family added successfully',gsDivision,res)
        } catch (error) {
            return failureResponse('Error adding Family',divisionId,res);
        }
    }

    public get_family(req: Request, res: Response) {
        if (req.params.divisionId) {
            const user_filter = { _id: req.params.divisionId};
            this.familyService.filterUser(user_filter, (err: any, division_data: IUsers) => {
                if (err) {
                    mongoError(err, res);
                }
                else if (!division_data) {
                    // No division found with the given ID
                    return DatanotFound('Division Not Found',req,res);
                } else if (!division_data.family || division_data.family.length === 0) {
                    // Division found but no families or no matching family found
                    return DatanotFound('Family not found in the division',req,res);
                }
                else 
                {
                    const foundFamily = division_data.family.find((family: any) => family._id == req.params.familyId);
                    if (!foundFamily) {
                        return DatanotFound('Family Not Found',req,res);
                    } else {
                        successResponse('get family successfull', foundFamily, res);
                    }
                }
            });
        } else {
            insufficientParameters("id field is missing",res);
        }
    }

    // Search family by name
    public searchFamily(req:Request, res:Response){
        if (req.params.divisionId) {
            const user_filter = { _id: req.params.divisionId};
            this.familyService.filterUser(user_filter, (err: any, division_data: IUsers) => {
                if (err) {
                    mongoError(err, res);
                }
                else if (!division_data) {
                    // No division found with the given ID
                    return DatanotFound('Division Not Found',req,res);
                } else if (!division_data.family || division_data.family.length === 0) {
                    // Division found but no families or no matching family found
                    return DatanotFound('Family not found in the division',req,res);
                }
                else 
                {
                    if(req.query.name)
                    {
                        const foundFamily = division_data.family.find((family: any) => family.name.toLowerCase() == req.query.name);
                        if (!foundFamily) {
                            return DatanotFound('Family not found',req,res);
                        } else {
                            return successResponse('get family successfull', foundFamily, res);
                        }
                    }
                    
                }
            });
        } else {
            insufficientParameters("id field missing",res);
        }
    }

    // Update family details API endpoint
    public async update_Family(req:Request, res:Response){
    try {
            const { gsDivisionId, familyId } = req.params;
            const updatedFamilyData = req.body;

            const gsDivision = await GsDivision.findById(gsDivisionId);
            if (!gsDivision) {
                return DatanotFound('GS Division not found',req,res);
            }

            const foundFamily = gsDivision.family.find((family: any) => family._id == req.params.familyId);
            if (!foundFamily) {
                return DatanotFound('Family not found',req,res);
            }

            // Update each field in the family object
            if (updatedFamilyData.name) foundFamily.name = updatedFamilyData.name;
            if (updatedFamilyData.address) foundFamily.address = updatedFamilyData.address;
            if (updatedFamilyData.phone) foundFamily.phone = updatedFamilyData.phone;

            // Update the member array if provided
            if (updatedFamilyData.member) foundFamily.member = updatedFamilyData.member;

            // Update the history array if provided
            if (updatedFamilyData.history) foundFamily.history = updatedFamilyData.history;

            const datas = await gsDivision.save();
            return successResponse('Family details updated successfully',datas,res)
        } catch (error) {
            return forbidden('Internal Server Error',req,res);
        }
    }

    public async delete_family(req: Request, res: Response) {
        const { divisionId, familyId } = req.params;
        if (divisionId) {
            const user_filter = { _id: divisionId};
            this.familyService.filterUser(user_filter, (err: any, division_data: IUsers) => {
                if (err) {
                    mongoError(err, res);
                }
                else if (!division_data) {
                    // No division found with the given ID
                    return DatanotFound('GS Division not found',req,res);
                } else if (!division_data.family || division_data.family.length === 0) {
                    // Division found but no families or no matching family found
                    return DatanotFound('Family not found in the division',req,res);
                }
                else 
                {
                    const foundFamily = division_data.family.find((family: any) => family._id == familyId);
                    if (!foundFamily) {
                        return DatanotFound('Family not found',req,res);
                    } 
                    else{
                        GsDivision.findByIdAndUpdate(divisionId,{ $pull: { family: { _id: familyId } } },
                            async (err: any, updatedDivision: any) => {
                                if (err) {
                                  mongoError(err, res);
                                } else if (!updatedDivision) {
                                    return DatanotFound('GS Division not found',req,res);
                                } else {
                                    const gsDivision = await GsDivision.findById(divisionId);
                                    return successResponse('Family deleted successfully',gsDivision.family,res);
                                }
                              }); 
                    }
                    
                };
            })
        } 
        else {
            insufficientParameters("id field missing",res);
        }
    }

    public async addMember(req: Request, res: Response) {
        const { divisionId,familyId } = req.params;
        try {
            const gsDivision = await GsDivision.findOne({_id: divisionId});
            if (!gsDivision) {
            return notFound;
            }
            const foundFamily = gsDivision.family.find((family: any) => family._id == familyId);
            if (!foundFamily) {
                return DatanotFound('Family not found',req,res);
            }
            else
            {
                let flag = false;
               foundFamily.member.forEach(item => {
                if(item.name == req.body.name)
                {
                    flag = true
                }
               })
               if(flag)
               {
                return forbidden('Member is Already registered',null,res);
               }
               else {
                foundFamily.member.push(req.body);
                await gsDivision.save();
                return successResponse('Member added successfully',foundFamily.member,res)
               }
                
            }
            
        } catch (error) {
            return failureResponse('Error adding member',divisionId,res);
        }
    }

    public async deleteMember(req:Request, res:Response){
        const { divisionId,familyId,memberId } = req.params;
        try {
            const gsDivision = await GsDivision.findOne({_id: divisionId});
            if (!gsDivision) {
            return notFound;
            }
            const foundFamily = gsDivision.family.find((family: any) => family._id == familyId);
            if (!foundFamily) {
                return DatanotFound('Family not found',req,res);
            }
            else
            {
                const memberIndex = foundFamily.member.findIndex((member: any) => member._id == memberId);              
                if (memberIndex === -1) {
                    return res.status(404).json({ error: 'Member not found in the family' });
                }
                foundFamily.member.splice(memberIndex, 1);
                gsDivision.save((err,updatedFamily) => {
                    if(err)
                    {
                        return failureResponse('Failed to delete a member',foundFamily.member,res)
                    }
                    const members = foundFamily.member;
                    return successResponse('Member Deleted Successfully',members,res)
                });
            }
            
        } catch (error) {
            return failureResponse('Error adding member',divisionId,res);
        }
    }

    public async updateMember(req:Request, res:Response) {
        const { gsDivisionId, familyId, memberId} = req.params;

            const gsDivision = await GsDivision.findById(gsDivisionId);
            if (!gsDivision) {
                return DatanotFound('GS Division not found',req,res);
            }

            const foundFamily = gsDivision.family.find((family: any) => family._id == req.params.familyId);
            if (!foundFamily) {
                return DatanotFound('Family not found',req,res);
            }
            const memberIndex = foundFamily.member.findIndex((member: any) => member._id == memberId);              
                if (memberIndex === -1) {
                    return DatanotFound('Member not found in the family',req,res);
                }
                const updatedMember = foundFamily.member[memberIndex];
                const member_params: any = {
                                        // _id: req.params.id,
                                        'name': req.body.name ? req.body.name : updatedMember.name,
                                        'gender': req.body.gender ? req.body.gender : updatedMember.gender,
                                        'dob': req.body.dob ? req.body.dob : updatedMember.dob,
                                        'role': req.body.role ? req.body.role : updatedMember.role,
                                        'nic_no': req.body.nic_no ? req.body.nic_no : updatedMember.nic_no,
                                        'occupation': req.body.occupation ? req.body.occupation : updatedMember.occupation,
                                    };
                foundFamily.member.splice(memberIndex, 1,member_params);
                gsDivision.save((err,division) => {
                    if(err)
                    {
                        return failureResponse('Failed to update a member',foundFamily.member,res)
                    }
                    const members = foundFamily.member;
                    return successResponse('Member Updated Successfully',members,res)
                });
            }
 
}