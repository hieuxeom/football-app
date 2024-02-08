import {query, QueryParams, QueryReturn} from "@/libs/database/queryDB";
import {ResultSetHeader} from "mysql2/promise";

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
export const isTeamExist = (teamId: string | number) => {
    return;
}

export const isTeamActive = async (teamId: string | number) => {
    return;
}

export const searchTeamsByName = (keyword: string) => {
    return;
}

export const getAllTeams = async (): Promise<QueryReturn> => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM teams"
    }

    return await query(queryBody);
}

export const updateTeamStatus = (teamId: number | string) => {
    return;
}
