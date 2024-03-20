import { Request, Response } from 'express';
import { insufficientParameters, mongoError, successResponse, failureResponse, notFound, DatanotFound, forbidden } from '../../modules/common/service';
import { IUser } from '../../modules/gs/model';
import { IUsers } from '../../modules/gs_division/model';
import UserService from '../../modules/gs/service';
import FamilyService from '../../modules/gs_division/service';
import { StringConstant } from '../../config/constant';
import e = require('express');
import { AppFucntion } from '../../app/app_function';
import GsDivision from '../../modules/gs_division/schema';

export class UserController {

    private user_service: UserService = new UserService();
    private family_service: FamilyService = new FamilyService();
    private string_constant:StringConstant = new StringConstant();

    public userRegistration(req: Request, res: Response) {
        // this check whether all the filds were send through the request or not
        if (req.body.name && req.body.email &&
            req.body.password && req.body.gs_division_id) {
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
            this.user_service.createUser(user_params, (err: any, user_data: IUser) => {
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
        } else {
            // error response if some fields are missing in request body
            insufficientParameters(res);
        }
    }

    public async login(req:Request, res:Response){
        const {email,password} = req.body;
        this.user_service.filterUser({email}, (err:any,sys_da:any) => {
                  if (err) {
                    return mongoError("", res);
                  } else {
                    if (!sys_da) {
                      return notFound(sys_da, res);
                    }
                    const comparePassword = AppFucntion.passwordVerify(password,sys_da.password)
                    if(!comparePassword)
                    {
                        return forbidden(this.string_constant.passwordMissMatch, sys_da, res);
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
            return successResponse('Family and Members added successfully',gsDivision,res)
        } catch (error) {
            return failureResponse('Error adding Family and member',divisionId,res);
        }
    }

    public get_family(req: Request, res: Response) {
        if (req.params.divisionId) {
            const user_filter = { _id: req.params.divisionId};
            this.family_service.filterUser(user_filter, (err: any, division_data: IUsers) => {
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
            insufficientParameters(res);
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
            this.family_service.filterUser(user_filter, (err: any, division_data: IUsers) => {
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
            insufficientParameters(res);
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
               
                foundFamily.member.push(req.body);
                await gsDivision.save();
                return successResponse('Member added successfully',foundFamily.member,res)
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

    // public async updateMember(req:Request, res:Response) {
    //     const { gsDivisionId, familyId, memberId} = req.params;
    //         const updatedMemberData = req.body;

    //         const gsDivision = await GsDivision.findById(gsDivisionId);
    //         if (!gsDivision) {
    //             return DatanotFound('GS Division not found',req,res);
    //         }

    //         const foundFamily = gsDivision.family.find((family: any) => family._id == req.params.familyId);
    //         if (!foundFamily) {
    //             return DatanotFound('Family not found',req,res);
    //         }
    //         const memberIndex = foundFamily.member.findIndex((member: any) => member._id == memberId);              
    //             if (memberIndex === -1) {
    //                 return res.status(404).json({ error: 'Member not found in the family' });
    //             }
    //             const updatedMember = foundFamily.member[memberIndex];
    //             if (updatedMemberData.name) updatedMember.name = updatedMemberData.name;
    //             if (updatedMemberData.gender) updatedMember.gender = updatedMemberData.gender;
    //             if (updatedMemberData.role) updatedMember.role = updatedMemberData.role;
    //             if (updatedMemberData.dob) updatedMember.dob = updatedMemberData.dob;
    //             if (updatedMemberData.nic_no) updatedMember.nic_no = updatedMemberData.nic_no;
    //             if (updatedMemberData.occupation) updatedMember.occupation = updatedMemberData.occupation;

    //             gsDivision.save();
    //             return successResponse('Family details updated successfully',updatedMember,res)
    // }
    
    // public update_Family(req: Request, res: Response) {
    //     if (req.params.id) {
    //         const user_filter = { _id: req.params.id };
    //         this.family_service.filterUser(user_filter, (err: any, user_data: IUsers) => {
    //             if (err) {
    //                 mongoError(err, res);
    //             }
    //             else if{
    //                 const user_params: IUsers = {
    //                     _id: req.params.id,
    //                     'user_data.family.name': req.body.name ? req.body.name : 'user_data.family.name',
    //                     'user_data.family.address': req.body.address ? req.body.address : 'user_data.family.address',
    //                     'user_data.family.phone': req.body.phone ? req.body.phone : 'user_data.family.phone',
    //                     is_deleted: req.body.is_deleted ? req.body.is_deleted : user_data.is_deleted,
    //                     modification_notes: user_data.modification_notes
    //                 };
    //                 this.user_service.updateUser(user_params, (err: any) => {
    //                     if (err) {
    //                         mongoError(err, res);
    //                     } else {
    //                         successResponse('update user successfull', null, res);
    //                     }
    //                 });
    //             }
    //             else {
    //                 failureResponse('invalid user', null, res);
    //             }
    //         });
    //     } else {
    //         insufficientParameters(res);
    //     }
    // }

    // public delete_user(req: Request, res: Response) {
    //     if (req.params.id) {
    //         this.user_service.deleteUser(req.params.id, (err: any, delete_details) => {
    //             if (err) {
    //                 mongoError(err, res);
    //             } else if (delete_details.deletedCount !== 0) {
    //                 successResponse('delete user successfull', null, res);
    //             } else {
    //                 failureResponse('invalid user', null, res);
    //             }
    //         });
    //     } else {
    //         insufficientParameters(res);
    //     }
    // }
}