"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonRoutes = void 0;
class CommonRoutes {
    route(app) {
        // Mismatch URL
        app.all('*', function (req, res) {
            res.status(404).send({ status: false, message: 'Requested method is wrong, please check you methods ex: (get | post | put | delete )', data: {} });
        });
    }
}
exports.CommonRoutes = CommonRoutes;
