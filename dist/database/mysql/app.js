"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const connection_1 = require("./connection");
class App {
}
exports.App = App;
_a = App;
App.addIntro = (title, description, img_url) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_addIntro('${title}', '${description}', '${img_url}')`;
    const result = yield connection_1.default.connect(sqlQueryString, null);
    if (result.err) {
        return { err: true, message: result.result };
    }
    return { err: false, data: result.result[0] };
});
App.getIntroById = (sid) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getById('${sid}')`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
App.updateIntro = (sid, title, description, img_url, updatedBy) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQueryString = `CALL sp_updateIntro(${sid}, '${title}', '${description}', '${img_url}', ${updatedBy})`;
    const sqlData = yield connection_1.default.connect(sqlQueryString, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
App.deleteIntro = (sid) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_deleteIntro(${sid})`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
App.getAllIntro = () => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `CALL sp_getAllIntro()`;
    const sqlData = yield connection_1.default.connect(sqlQuery, null);
    if (sqlData.err) {
        return { err: true, message: sqlData.result };
    }
    return { err: false, data: sqlData.result[0] };
});
