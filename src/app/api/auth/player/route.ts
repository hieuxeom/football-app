import {NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";
import {createJWTToken, getPlayerData, isExpiredToken, setJWTTokenToPlayer} from "@/app/api/auth/player/handle";
import {getPlayerInfoById} from "@/app/api/players/handle";
import {IPlayers} from "@/utils/interfaces/players/players";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email");
    const provider = searchParams.get("provider");

    if (!email || !provider) {
        return NextResponse.json({status: 400, message: "Bad request, request requires 2 parameters, please add the missing parameters"});
    }

    const {results, length} = await getPlayerData(email, provider);
    if (length === 0) {
        return NextResponse.json({status: 204, message: "Could not find any players with matching email and provider"})

    }
    return NextResponse.json({status: 200, message: "Successfully get player data", data: results})
}

export async function POST(request: NextRequest) {

    const {jwtToken, playerId} = await request.json();

    if (!jwtToken && !playerId) {
        return NextResponse.json({status: 400, message: "Bad request, missing required parameters"});
    }

    if (!jwtToken) {
        const {results: playerData} = await getPlayerInfoById(playerId);
        const token: string = createJWTToken({...(playerData as any[])[0]} as IPlayers);
        await setJWTTokenToPlayer(token, playerId);

        return NextResponse.json({
            status: 200,
            message: "Successfully created new token",
            data: {
                newToken: token
            }
        })
    }

    if (jwtToken) {
        const checkTokenExpired = isExpiredToken(jwtToken);
        return NextResponse.json(checkTokenExpired)
    }

}