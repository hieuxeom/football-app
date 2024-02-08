import mysql, {OkPacket, ProcedureCallPacket, ResultSetHeader, RowDataPacket} from "mysql2/promise";
import {getDatabaseSetting} from "@/libs/database/dbSetting";

export interface QueryParams {
    queryString: string;
    values?: any[];
}

export interface QueryReturn {
    results: OkPacket | RowDataPacket[] | ResultSetHeader | ResultSetHeader[] | RowDataPacket[][] | OkPacket[] | ProcedureCallPacket;
    length: number;
    errorCode?: string;
    errorMsg?: string;
}

const connectionParams = getDatabaseSetting();

const query = async ({queryString, values = []}: QueryParams): Promise<QueryReturn> => {
    const connection = await mysql.createConnection(connectionParams);

    if (queryString.split("?").length - 1 !== values?.length) {
        throw {
            errorCode: "ERROR",
            errorMsg: "Not enough parameters in values"
        };

    }

    try {

        const [results] = await connection.execute(queryString, values);

        await connection.end();

        return {
            results,
            length: Array.isArray(results) ? results.length : 0,
        };
    } catch (err: any) {
        throw {
            errorCode: err.code,
            errorMsg: err.message,
        };
    }
};

const getTotalRow = async (tableName: string): Promise<number> => {
    const {results} = await query({
        queryString: `SELECT COUNT(*) AS total
                      FROM ${tableName}`,
    });
    return Array.isArray(results) ? (results[0] as { total: number }).total : 0;
};

export {query, getTotalRow};
