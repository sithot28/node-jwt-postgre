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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbUtils = __importStar(require("../utils/dbUtils"));
const transactionSuccess = 'transaction success';
exports.participantInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    let sql = 'SELECT now()';
    let data = [];
    let result;
    try {
        result = yield dbUtils.sqlToDB(sql, data);
        //console.log('Result ',result);
        return result;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.multi = () => __awaiter(void 0, void 0, void 0, function* () {
    let sql = "INSERT INTO multi VALUES($1,$2,$3,$4,$5,$6) RETURNING *";
    let data = [444, 'AMA SALAM', '2019-01-29', '01:02:03', 1234.56789, 'false'];
    let result;
    try {
        let result = yield dbUtils.query(sql, data);
        return result.rows;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.processTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    let sql_customer = "SELECT id,nama FROM customer where id='1'";
    let sql_product = "INSERT INTO product VALUES($1,$2::varchar,$3::json) RETURNING *";
    let data = [];
    let result_customer, result_product;
    try {
        result_customer = yield dbUtils.sqlToDB(sql_customer, data);
        let param = [result_customer.rows[0]['id'], result_customer.rows[0]['nama'], '{"item": "Laptop"}'];
        result_product = yield dbUtils.sqlToDB(sql_product, param);
        return result_product.rows;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.insertTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    let sql_customer = "INSERT INTO customer values($1::NUMERIC,$2::text)";
    let sql_sales = "INSERT INTO sales values($1,$2,$3)";
    let sql_sales2 = "DELETE from sales";
    let data_customer = [3, 'SITHOT'];
    let data_sales = [2019, 9, 15];
    let trx = yield dbUtils.getTransaction();
    try {
        yield dbUtils.sqlExecSingleRow(trx, sql_customer, data_customer);
        yield dbUtils.sqlExecSingleRow(trx, sql_sales, data_sales);
        yield dbUtils.commit(trx);
        return transactionSuccess;
    }
    catch (error) {
        yield dbUtils.rollback(trx);
        console.log('Rollback ', error);
        throw new Error(error.message);
    }
});
exports.participantClaim = {
    name: 'AMA',
    age: 10
};
//# sourceMappingURL=participantModel.js.map