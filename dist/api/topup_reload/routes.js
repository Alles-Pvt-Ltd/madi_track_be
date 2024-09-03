"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopupReloadRoutes = void 0;
const controller_1 = require("./controller");
const verify_token_1 = require("../../app/verify_token");
const class_1 = require("../../api/user/class");
class TopupReloadRoutes {
    constructor() {
        this.topupReloadController = new controller_1.TopupReloadController();
        this.validation = new class_1.Validation();
        this.verify = new verify_token_1.Verify();
    }
    route(app, url) {
        //topup
        app.post(url, this.verify.verify, (req, res) => {
            this.topupReloadController.topupOrReload(req, res);
        });
        //admin topup distributor
        app.post(url + '/distributor', this.verify.verify, (req, res) => {
            console.log('19');
            this.topupReloadController.topupDistributor(req, res);
        });
        //get amount from merchant and toup to distibutor
        app.post(url + '/get-money-from-merchant/:code', this.verify.verify, (req, res) => {
            this.topupReloadController.getMoneyFromMerchant(req, res);
        });
        // get topup history merchant code
        app.get(url + '/history/:code', this.verify.verify, (req, res) => {
            this.topupReloadController.topupHistory(req, res);
        });
        // get reload history
        // *
        app.get(url + '/reload/:disCode/:merCode/:pageNumber', this.verify.verify, (req, res) => {
            console.log('36');
            this.topupReloadController.reloadHistory(req, res);
        });
        // app.get(url+'/reload/:disCode/:merCode',this.verify.verify,(req: Request, res: Response) => {
        //     console.log('36');
        //     this.topupReloadController.reloadHistory(req, res);
        // });
        // get reload history by mobile
        // *
        app.get(url + '/reload/mobile/:disCode/:mobile/:pageNumber', this.verify.verify, (req, res) => {
            this.topupReloadController.reloadHistoryByMobile(req, res);
        });
        // get reload history by reqid
        app.get(url + '/reload/history/reqid/:disCode/:reqid', this.verify.verify, (req, res) => {
            this.topupReloadController.reloadHistoryByReqid(req, res);
        });
        // ping
        app.get(url + '/ping', this.verify.verify, (req, res) => {
            this.topupReloadController.ping(req, res);
        });
        // get reload history by date
        // *
        app.get(url + '/reload/date/:dis_code/:s_date/:e_date/:page_number', this.verify.verify, (req, res) => {
            console.log('60');
            this.topupReloadController.reloadHistoryBydate(req, res);
        });
        // get admin balance
        app.get(url + '/adminBalance', this.verify.verify, (req, res) => {
            this.topupReloadController.adminBalance(req, res);
        });
        // get distibutor balance
        app.get(url + '/distibutorBalance/:dis_code', this.verify.verify, (req, res) => {
            this.topupReloadController.distibutorBalance(req, res);
        });
        // get admin topup history
        app.get(url + '/admin-topup/history/:disCode/:page_number', this.verify.verify, (req, res) => {
            console.log('70');
            this.topupReloadController.adminTopupHistory(req, res);
        });
        // get admin topup history by date
        app.get(url + '/admin-topup/date/:s_date/:e_date/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.adminTopupHistoryBydate(req, res);
        });
        // get admin topup history by Mobile
        app.get(url + '/admin-topup/mobile/:mobile/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.adminTopupHistoryByMobile(req, res);
        });
        // get admin topup history by Email
        app.get(url + '/admin-topup/email/:email/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.adminTopupHistoryByEmail(req, res);
        });
        // get distibutor topup history by Email
        app.get(url + '/distibutor-topup/email/:email/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.distibutorTopupHistoryByEmail(req, res);
        });
        // get distibutor topup history by Mobile
        app.get(url + '/distibutor-topup/mobile/:mobile/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.distibutorTopupHistoryByMobile(req, res);
        });
        // get reload history by date
        app.get(url + '/distibutor-topup/date/:s_date/:e_date/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.distibutorTopupHistoryBydate(req, res);
        });
        // get distibutor topup history
        app.get(url + '/distibutor-topup/history/:merCode/:page_number', this.verify.verify, (req, res) => {
            this.topupReloadController.distibutorTopupHistory(req, res);
        });
    }
    ;
}
exports.TopupReloadRoutes = TopupReloadRoutes;
;
