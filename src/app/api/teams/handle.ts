import {query, QueryParams, QueryReturn} from "@/libs/database/queryDB";
import {ResultSetHeader} from "mysql2/promise";
import {ITeam} from "@/utils/interfaces/teams/teams";

export interface IUpdateTeam {
    teamId: string | number;
    teamName: string;
    teamLogo: string;
}

export const createNewTeam = async (teamName: string, teamLogo: string, teamOwner: string | number) => {
    const queryBody: QueryParams = {
        queryString: "INSERT INTO teams(teamName, teamLogo, teamOwner) VALUES (?, ?, ?)",
        values: [teamName, teamLogo, teamOwner]
    }

    const {results}: QueryReturn = await query(queryBody);
    const {insertId: teamId} = results as ResultSetHeader;

    return await getTeamInfoById(teamId);

}

export const getTeamInfoById = async (teamId: string | number) => {
    const queryBody: QueryParams = {
        queryString: "SELECT * from teams WHERE teamId = ?",
        values: [teamId]
    }
    return await query(queryBody);
}

export const getTeamsOnPage = async (page: string | number, limit: string | number): Promise<QueryReturn> => {

    page = Number(page);
    limit = Number(limit);

    const queryBody: QueryParams = {
        queryString: `SELECT * FROM teams LIMIT ${(page - 1) * limit}, ${limit}`
    }

    return await query(queryBody);
}

export const updateTeamInfo = async (updateData: IUpdateTeam): Promise<QueryReturn> => {
    const {teamId, teamName, teamLogo} = updateData;

    const queryBody: QueryParams = {
        queryString: "UPDATE teams SET teamName = ?, teamLogo = ?, updatedAt = CURRENT_TIMESTAMP WHERE teamId = ?",
        values: [teamName, teamLogo, teamId]
    }

    return await query(queryBody);
}

export const isTeamOwner = async (teamId: string | number, playerId: string | number): Promise<boolean> => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM teams WHERE teamId = ? AND teamOwner = ?",
        values: [teamId, playerId]
    }

    const {length} = await query(queryBody);
    return length > 0;
}

export const isTeamExist = async (teamId: string | number): Promise<boolean> => {
    const {length} = await getTeamInfoById(teamId);
    return length > 0;
}

export const isTeamActive = async (teamId: string | number) => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM teams WHERE teamId = ?",
        values: [teamId]
    }

    const {results} = await query(queryBody)

    return (results as ITeam[])[0].isActive === 0;
}

export const searchTeamsByName = async (keyword: string): Promise<QueryReturn> => {
    const queryBody: QueryParams = {
        queryString: `SELECT * FROM teams WHERE teamName LIKE '%${keyword}%'`
    }
    return await query(queryBody);
}

export const getAllTeams = async (): Promise<QueryReturn> => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM teams"
    }

    return await query(queryBody);
}

export const updateTeamStatus = async (teamId: number | string, isActive: number) => {
    const queryBody: QueryParams = {
        queryString: "UPDATE teams SET isActive = ? WHERE teamId = ?",
        values: [isActive, teamId]
    }
    return await query(queryBody);
}
