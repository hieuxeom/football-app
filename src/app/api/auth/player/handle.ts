import jwt, {TokenExpiredError} from "jsonwebtoken"
import {query, QueryParams} from "@/libs/database/queryDB";
import {IPlayers} from "@/utils/interfaces/players/players";

export const createJWTToken = (playerData: IPlayers) => {

    return jwt.sign(playerData, process.env.NEXTAUTH_SECRET as string, {
        expiresIn: process.env.JWT_EXPIRED_TIME
    })
}

export const isExpiredToken = (token: string) => {
    try {
        const checkToken = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
        return {
            status: 200,
            message: "Successfully get player information from token",
            data: checkToken,
        }
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return {
                status: 301,
                message: "Token has expired"
            }
        } else {
            return {
                status: 400,
                message: "Have some problems"
            }
        }
    }

}

export const setJWTTokenToPlayer = async (token: string, playerId: string | number) => {
    const queryBody: QueryParams = {
        queryString: "UPDATE players SET jwtToken = ? WHERE playerId = ?",
        values: [token, playerId]
    }

    return await query(queryBody);
}

export const getPlayerData = async (email: string, provider: string) => {
    const queryBody: QueryParams = {
        queryString: "SELECT * FROM players WHERE email = ? AND provider = ?",
        values: [email, provider]
    }

    return await query(queryBody);
}