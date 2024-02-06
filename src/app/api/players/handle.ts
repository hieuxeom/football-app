import {query, QueryParams, QueryReturn} from "@/libs/database/queryDB";
import {IPlayers} from "@/utils/interfaces/players/players";
import {ResultSetHeader} from "mysql2/promise";

export const isAccountExists = async (email: string, provider: string) => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM players WHERE email = ? AND provider = ?",
        values: [email, provider],
    };
    const {length}: QueryReturn = await query(queryBody);
    console.log(`length => `, length);
    return length > 0;
};

export const createNewPlayer = async (email: string, fullName: string, avatar: string, provider: string) => {
    const queryBody: QueryParams = {
        queryString: "INSERT INTO players (email, fullName, provider, avatar) VALUES (?, ?, ?, ?)",
        values: [email, fullName, provider, avatar],
    };
    const {results}: QueryReturn = await query(queryBody);

    const {insertId: playerId} = results as ResultSetHeader;

    return await getPlayerInfoById(playerId);
};

export const getPlayerInfoById = async (playerId: number | string) => {
    const queryBody: QueryParams = {


        queryString: "SELECT playerId, fullName, dateOfBirth, email, phoneNumber, socialLink, isActive, createdAt, updatedAt, provider, avatar FROM" +
            " players WHERE playerId = ?",
        values: [playerId],
    };

    return await query(queryBody);
};

export const isPlayerExists = async (playerId: number | string) => {
    const {length} = await getPlayerInfoById(playerId);

    return length > 0;
};

export const getPlayerInfoByEmail = async (email: string) => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM players WHERE email = ?",
        values: [email],
    };

    return await query(queryBody);
};

export const getAllPlayers = async () => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM players",
    };

    return await query(queryBody);
};

export const getPlayersOnPage = async (page: number, limit: number) => {
    const queryBody: QueryParams = {
        queryString: `SELECT * FROM players LIMIT ${(page - 1) * limit}, ${limit}`,
    };

    return await query(queryBody);
};

export const getPlayerStatus = async (playerId: number | string) => {
    const queryBody: QueryParams = {
        queryString: `SELECT * FROM players WHERE playerId = ?`,
        values: [playerId],
    };

    const {results}: QueryReturn = await query(queryBody);

    return (results as IPlayers[])[0].isActive;
};

export const updatePlayerInfo = async ({playerId, fullName, dateOfBirth, email, phoneNumber, socialLink}: IPlayers) => {
    const queryBody: QueryParams = {
        queryString: "UPDATE players SET fullName = ?, dateOfBirth = ?, email = ?, phoneNumber = ?, socialLink = ? WHERE playerId = ?",
        values: [fullName, dateOfBirth, email, phoneNumber, socialLink, playerId],
    };

    return await query(queryBody);
};

export const updatePlayerStatus = async (playerId: number | string, isActive: string | number) => {
    const queryBody: QueryParams = {
        queryString: "UPDATE players SET isActive = ? WHERE playerId = ?",
        values: [isActive, playerId],
    };

    return await query(queryBody);
};

export const updatePlayerJWTToken = async (playerId: number | string, jwtToken: string) => {
    const queryBody: QueryParams = {
        queryString: "UPDATE players SET jwtToken = ? WHERE playerId = ?",
        values: [jwtToken, playerId],
    };

    return await query(queryBody);
};
