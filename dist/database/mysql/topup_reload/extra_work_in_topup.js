// else if (req.body.mobile) {
//     // we assign valuse from request body
//     const mobile = req.body.mobile;
//     const amount = req.body.amount;
//     // here we generate random value for request id
//     const reqid = Math.random().toString(26).slice(2);
//     // here we are getting ezlanka provider code
//     const getProvider = TopUpReloadQuery.getProvider(req.body.op_code);
//     return Mysql.connct(getProvider, req, async (err, d, da) => {
//       if (err) {
//         return cb(err, d, da);
//       }
//       const opcode = d[0].opcode;
//        // get service by service code query
//        const getServicesPercentageByserviceCode: any = TopUpReloadQuery.getServicesPercentageByserviceCode( req.body.op_code );
//        // get service by service code
//        return Mysql.connct( getServicesPercentageByserviceCode, req,  (err, data, da) => {
//            if (err) {
//              return cb(err, data, da);
//            }
//            console.log(data[0]);
//            const admin_distibutor_percentage=data[0].admin_distibutor_percentage;
//            const distributor_percentage=data[0].distributor_percentage;
//            const merchants_percentage=data[0].merchants_percentage;
//            console.log(typeof admin_distibutor_percentage);
//            const support = async ()=>{
//               // get merchant by user code query
//                 var getUserIdByUserCode: any = Query.getUser(req.user.id);
//                 return Mysql.connct(getUserIdByUserCode, req, (err, d, da) => {
//                   if (err) {
//                     return cb(err, d, da);
//                   }
//               // if user not available for user code
//                   if (d.length < 1) {
//                     return cb(this.stringConstant.unableGet, d, da);
//                   }
//               // add merchant id in request body
//                   const merchant_id = d[0].id;
//                   // get merchant details by merchant id
//                   const getMerchansByUserId: any = TopUpReloadQuery.getMerchansByUserId(merchant_id);
//                   // get service by service code query
//                   const getServicesPercentageByserviceCode: any = TopUpReloadQuery.getServicesPercentageByserviceCode( req.body.op_code );
//                   // get service by service code
//                   return Mysql.connct( getServicesPercentageByserviceCode, req, (err, data, da) => {
//                       if (err) {
//                         return cb(err, data, da);
//                       }
//                       // if mechants not available for user id
//                       if (data.length < 1) {
//                         return cb(this.stringConstant.unableGet, d, da);
//                       }
//                       // req.servide_id = data[0].service_id;
//                       // req.provider_id = data[0].provider_id;
//                       const provider_id = data[0].provider_id;
//                       // get  merchants by user id
//                       return Mysql.connct( getMerchansByUserId, req, (err, d, da) => {
//                           if (err) {
//                             return cb(err, d, da);
//                           }
//                           // if mechants not available for user id
//                           if (d.length < 1) {
//                             return cb(this.stringConstant.unableGet, d, da);
//                           }
//                           // req.distributor_id = d[0].distributors_id;
//                           //here check merchant have enough amount for reload
//                           if (d[0].amount < req.body.amount && req.body.mobile) {
//                             return cb(this.stringConstant.notEnoughMoney, d, da);
//                           }
//                           // previous amount of merchant
//                           var previousAmountMerchant = d[0].amount;
//                           // here we reduce recharege amount acoding the merchant percentage
//                           req.body.currentAmountOfMechant = previousAmountMerchant - req.body.amount * ((100 - data[0].merchants_percentage) / 100);
//                              // topup merchant query
//                              const topupMechant: any = TopUpReloadQuery.topupMechant( req.body.currentAmountOfMechant, merchant_id );
//                           // get distibutor by id
//                           const getDistributorsByUserId: any = TopUpReloadQuery.getDistributorsByUserId( d[0].distributors_id );
//                           // get distributors by id
//                           return Mysql.connct( getDistributorsByUserId, req, (err, d, da) => {
//                               if (err) {
//                                 return cb(err, d, da);
//                               }
//                               // if distributors not available for user id
//                               if (d.length < 1) {
//                                 return cb(this.stringConstant.unableGet, d, da);
//                               }
//                               // previous amount of distibutor
//                               var previousAmountDistributor = d[0].amount;
//                               //
//                               // if (
//                               //   previousAmountDistributor < req.body.amount &&
//                               //   req.body.user_code
//                               // ) {
//                               //   return cb(
//                               //     this.stringConstant.notEnoughMoneyToTopup,
//                               //     d,
//                               //     da
//                               //   );
//                               // }
//                               // here we add recharege amount acoding the distributor percentage
//                               req.body.currentAmountOfDistributor = previousAmountDistributor + req.body.amount * (data[0].distributor_percentage / 100);
//                               var distibutorId = d[0].distributors_id;
//                               //  add topup to distributor query
//                               const topupDistributor: any = TopUpReloadQuery.topupDistributor( req.body.currentAmountOfDistributor, distibutorId );
//                               const getAdmin: any = TopUpReloadQuery.getAdmin();
//                               // get distributors by id
//                               return Mysql.connct(getAdmin, req, async (err, d, da) => {
//                                 if (err) {
//                                   return cb(err, d, da);
//                                 }
//                                 var previousAmountAdmin = d[0].amount;
//                                 const currentAmountOfAdmin = previousAmountAdmin + req.body.amount * (data[0].admin_percentage / 100);
//                                 const updateAmountToAdmin: any = TopUpReloadQuery.updateAmountToAdmin( currentAmountOfAdmin );
//                                 try {
//                                   // ezlanka recharge api
//                                       var ezLankaErrorCode = await recharge( mobile, opcode, amount, reqid );
//                                     } catch (error) {
//                                       return cb(this.stringConstant.reloadError, null, da);
//                                     }
//                                 const reloadStatus = { new: ezLankaErrorCode.status[0] };
//                                 // we make array as string
//                                 const jsonReloadStatus = JSON.stringify(reloadStatus);
//                                 ezLankaErrorCode.reloadStatus = jsonReloadStatus;
//                                 // add topup history query
//                                 const addReloadHistory: any = TopUpReloadQuery.addReloadHistory( merchant_id, req, ezLankaErrorCode, provider_id );
//                                 // if this result come from recharge then money will reduce from our walet 1000=success,1018,1010 are pending
//                                 if (
//                                   ezLankaErrorCode.ec[0] === "1000" ||
//                                   ezLankaErrorCode.ec[0] === "1018" ||
//                                   ezLankaErrorCode.ec[0] === "1010"
//                                 ) {
//                                   // add recharge amount accoding admin service percentage
//                                   return Mysql.connct( updateAmountToAdmin, req, (err, d, da) => {
//                                       if (err) {
//                                         return cb(err, d, da);
//                                       }
//                                       // add recharge amount accoding distibutor service percentage
//                                       return Mysql.connct( topupDistributor, req, (err, d, da) => {
//                                           if (err) {
//                                             return cb(err, d, da);
//                                           }
//                                           // add topup history
//                                           return Mysql.connct( addReloadHistory, req, (err, d, da) => {
//                                               if (err) {
//                                                 return cb(err, d, da);
//                                               }
//                                               //reduce recharge amount accoding merchant service percentage
//                                               return Mysql.connct( topupMechant, req, (err, d, da) => {
//                                                   // if we success
//                                                   if ( ezLankaErrorCode.ec[0] === "1000" ) {
//                                                     return cb(err, d, da);
//                                                   } else if ( ezLankaErrorCode.ec[0] === "1010" || ezLankaErrorCode.ec[0] === "1018" ) {// if we got pending
//                                                     // we get request id from ezLankaErrorCode(from recharge api)
//                                                     var reqid = ezLankaErrorCode.reqid[0];
//                                                     const getCurrentRechargeStatus = async () => {
//                                                         try {
//                                                           var getRechargeStatus = await getStatus(reqid);
//                                                         } catch (error) {
//                                                           return cb( this.stringConstant .getStatusError, null, da );
//                                                         }
//                                                         // if we success after pending
//                                                         if (
//                                                           getRechargeStatus .ec[0] === "1000"
//                                                         ) {
//                                                           // create an array
//                                                           const reloadStatus = { old: ezLankaErrorCode .status[0], new: getRechargeStatus .status[0]};
//                                                           // we make array as string
//                                                           const jsonReloadStatus = JSON.stringify( reloadStatus );
//                                                           // update reload history query
//                                                           const updateReloadHistoryStatus: any = TopUpReloadQuery.updateReloadHistoryStatus( getRechargeStatus, jsonReloadStatus );
//                                                           // once we get success we do not need to do set interval ,so we clear interval
//                                                           clearInterval(myInterval);
//                                                           // update reload history
//                                                           return Mysql.connct( updateReloadHistoryStatus, req, (err, d, da) => {
//                                                               if (err) {
//                                                                 return cb( err, d, da );
//                                                               }
//                                                               return cb( getRechargeStatus .remark[0], d, da );
//                                                             }
//                                                           );
//                                                         } else if ( getRechargeStatus .ec[0] === "1014" ) {
//                                                           // if we get refund as status
//                                                           // create an array
//                                                           const reloadStatus = { old: ezLankaErrorCode .status[0], new: getRechargeStatus .status[0]};
//                                                           // const reloadStatus = new Array();
//                                                           // // here we push earlier recharge status
//                                                           // reloadStatus.push(
//                                                           //   ezLankaErrorCode.status[0]
//                                                           // );
//                                                           // // here we push current recharge status
//                                                           // reloadStatus.push(
//                                                           //   getRechargeStatus.status[0]
//                                                           // );
//                                                           // we make array as string
//                                                           const jsonReloadStatus = JSON.stringify( reloadStatus );
//                                                           // update reload history query
//                                                           const updateReloadHistoryStatus: any = TopUpReloadQuery.updateReloadHistoryStatus( getRechargeStatus, jsonReloadStatus );
//                                                           // once we get success we do not need to do set interval ,so we clear interval
//                                                           clearInterval(myInterval);
//                                                           // update reload history
//                                                           return Mysql.connct( updateReloadHistoryStatus, req, (err, d, da) => {
//                                                               if (err) {
//                                                                 return cb( err, d, da );
//                                                               }
//                                                               // get merchant details
//                                                               return Mysql.connct( getMerchansByUserId, req, (err, d, da) => {
//                                                                   if (err) {
//                                                                     return cb( err, d, da );
//                                                                   }
//                                                                   // if mechants not available for user id
//                                                                   if (
//                                                                     d.length < 1
//                                                                   ) {
//                                                                     return cb( this .stringConstant .unableGet, d, da );
//                                                                   }
//                                                                   // we get the current amount of merchant
//                                                                   var currentAmountMerchant = d[0].amount;
//                                                                   // add reload amount  with the current amount because of refund
//                                                                   req.body.currentAmountOfMechant = currentAmountMerchant + req.body .amount * ((100 - data[0] .merchants_percentage) / 100);
//                                                                   // topup merchant query
//                                                                   const topupMechant: any = TopUpReloadQuery.topupMechant( req.body .currentAmountOfMechant, merchant_id );
//                                                                   // get distributors detailsby user id
//                                                                   return Mysql.connct( getDistributorsByUserId, req, ( err, d, da ) => {
//                                                                       if (err) {
//                                                                         return cb( err, d, da );
//                                                                       }
//                                                                       // if distributors not available for user id
//                                                                       if (
//                                                                         d.length < 1
//                                                                       ) {
//                                                                         return cb( this .stringConstant .unableGet, d, da );
//                                                                       }
//                                                                       // current amount of distibutor
//                                                                       var currentAmountDistributor = d[0].amount;
//                                                                       // current amount of distibutor
//                                                                       // we reduce reload commion from distributor amount because of refund
//                                                                       req.body.currentAmountOfDistributor = currentAmountDistributor - req.body .amount * (data[0] .distributor_percentage / 100);
//                                                                       // topup query
//                                                                       const topupDistributor: any = TopUpReloadQuery.topupDistributor( req.body .currentAmountOfDistributor, distibutorId );
//                                                                       const getAdmin: any = TopUpReloadQuery.getAdmin();
//                                                                       // get distributors by id
//                                                                       return Mysql.connct( getAdmin, req, ( err, d, da ) => {
//                                                                           if (err) {
//                                                                             return cb( err, d, da );
//                                                                           }
//                                                                           var previousAmountAdmin = d[0] .amount;
//                                                                           const currentAmountOfAdmin = previousAmountAdmin - req.body .amount * (data[0] .admin_percentage / 100);
//                                                                           const updateAmountToAdmin: any = TopUpReloadQuery.updateAmountToAdmin( currentAmountOfAdmin );
//                                                                           //   add topup to merchants
//                                                                           return Mysql.connct( topupMechant, req, ( err, d, da ) => {
//                                                                               if ( err ) {
//                                                                                 return cb( err, d, da );
//                                                                               }
//                                                                               //   add topup to distributor
//                                                                               return Mysql.connct( topupDistributor, req, ( err, d, da ) => {
//                                                                                   if ( err ) {
//                                                                                     return cb( err, d, da );
//                                                                                   }
//                                                                                   //   add topup to distributor
//                                                                                   return Mysql.connct( updateAmountToAdmin, req, ( err, d, da ) => {
//                                                                                       if ( err ) {
//                                                                                         return cb( err, d, da );
//                                                                                       }
//                                                                                       return cb( getRechargeStatus .remark[0], d, da );
//                                                                                     } );
//                                                                                 } );
//                                                                             } );
//                                                                         }
//                                                                       );
//                                                                     }
//                                                                   );
//                                                                 }
//                                                               );
//                                                             }
//                                                           );
//                                                         }
//                                                       };
//                                                     // if we get pending result from ezlanka code then we will call getCurrentRechargeStatus to update the new status,this will continue until we get success or refund.for that we use setInterval function
//                                                     var myInterval = setInterval( getCurrentRechargeStatus, 60000 );
//                                                   }
//                                                 }
//                                               );
//                                             }
//                                           );
//                                         }
//                                       );
//                                     }
//                                   );
//                                 } else {
//                                   // if we get fail status from ezlanka code it will come in else part
//                                   delete req.body.currentAmountOfMechant;
//                                   delete req.body.currentAmountOfDistributor;
//                                   return cb(ezLankaErrorCode.remark[0], null, req);
//                                 }
//                               });
//                             }
//                           );
//                         }
//                       );
//                     }
//                   );
//                 });
//            }
//           //  here we check admin gave distibutor to some commision
//            if (admin_distibutor_percentage===(distributor_percentage+merchants_percentage)) {
//              return support()
//            }else if(admin_distibutor_percentage<(distributor_percentage+merchants_percentage)){
//             const reduce_amount_percentage_from_distibutor=(distributor_percentage+merchants_percentage)-admin_distibutor_percentage;
//              // get merchant by user code query
//              var getUserIdByUserCode: any = Query.getUser(req.user.id);
//              return Mysql.connct(getUserIdByUserCode, req, (err, d, da) => {
//                if (err) {
//                  return cb(err, d, da);
//                }
//            // if user not available for user code
//                if (d.length < 1) {
//                  return cb(this.stringConstant.unableGet, d, da);
//                }
//            // add merchant id in request body
//                const merchant_id = d[0].id;
//              const getMerchansByUserId: any = TopUpReloadQuery.getMerchansByUserId(merchant_id);
//              return Mysql.connct(getMerchansByUserId, req, (err, d, da) => {
//               if (err) {
//                 return cb(err, d, da);
//               }
//               const distributors_id=d[0].distributors_id;
//              const getDistributorsByUserId: any = TopUpReloadQuery.getDistributorsByUserId(distributors_id);
//               return Mysql.connct(getDistributorsByUserId, req, (err, d, da) => {
//                 if (err) {
//                   return cb(err, d, da);
//                 }
//                 const reduce_money_from_distibutor=req.body.amount*(reduce_amount_percentage_from_distibutor/100);
//                 const after_reduce_from_distibutor=d[0].amount-reduce_money_from_distibutor
//                 if (after_reduce_from_distibutor>=0) {
//                   console.log('577');
//                  const topupDistributor= TopUpReloadQuery.topupDistributor(after_reduce_from_distibutor,distributors_id)
//                  return Mysql.connct(topupDistributor, req, (err, d, da) => {
//                   if (err) {
//                     return cb(err, d, da);
//                   }
//                   return support()               
//                   });
//                 }
//              });
//             });
//             });
//            }
//     });
//     });
//   }
