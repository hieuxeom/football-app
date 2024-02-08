import {NextRequest, NextResponse} from "next/server";
import {generateResponse} from "@/utils/requests/generateResponse";
import {QueryReturn, QueryParams, query} from "@/libs/database/queryDB";
import {
    createNewPlayer,
    getAllPlayers,
    getPlayerStatus,
    getPlayersOnPage,
    isAccountExists,
    getPlayerInfoById,
    updatePlayerInfo,
    updatePlayerStatus,
    updatePlayerJWTToken,
    isPlayerExists,
} from "./handle";
import {IPlayers} from "@/utils/interfaces/players/players";
import {onlyNumberRegex} from "@/utils/regex";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const limit = searchParams.get("limit") || process.env.TABLE_PAGINATION_DEFAULT;
    const playerId = searchParams.get("playerId");

    const {results: allPlayerData, length: totalRow} = await getAllPlayers();

    if (playerId) {

        if (onlyNumberRegex.test(playerId)) {
            return NextResponse.json({
                status: 400,
                message: "The value of the `playerId` parameter is invalid"
            })
        }

        const {results: playerData, length} = await getPlayerInfoById(playerId);

        if (length === 0) {
            return NextResponse.json({
                status: 204,
                message: `Could not find any player with playerId ${playerId}`,
            });
        }

        return NextResponse.json({
            status: 200,
            message: `Successfully get information of player ${playerId}`,
            data: playerData,
        });
    }

    if (page) {

        if (onlyNumberRegex.test(page)) {
            return NextResponse.json({
                status: 400,
                message: "The value of the `page` parameter is invalid"
            })
        }

        const {results, length} = await getPlayersOnPage(page, limit!);

        if (length === 0) {
            return NextResponse.json({
                status: 204,
                message: `Not enough player data to create page ${page}`,
                totalRow,
                totalPage: Math.ceil(totalRow / Number(limit)),
                currentPage: Number(page),
            });
        }

        return NextResponse.json({
            status: 200,
            message: `Successfully get information of ${length} players on page ${page}`,
            length,
            totalRow,
            totalPage: Math.ceil(totalRow / Number(limit)),
            currentPage: Number(page),
            data: results,
        });
    }

    if (totalRow === 0) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any players to return`,
        });
    }

    return NextResponse.json({
        status: 200,
        message: `Successfully get information of ${totalRow} player(s)`,
        length: totalRow,
        data: allPlayerData,
    });
}

export async function POST(request: NextRequest) {
    const {fullName, email, avatar, provider} = await request.json();
    console.log(fullName, email, avatar, provider);
    const requiredParams = [
        !fullName && "fullName",
        !email && "email",
        !avatar && "avatar",
        !provider && "provider"].filter((param) => param);

    if (requiredParams.length > 0) {
        return NextResponse.json(generateResponse(200, `Missing required params: ${requiredParams.join(", ")}`));
    }

    if (await isAccountExists(email, provider)) {
        return NextResponse.json(generateResponse(301, "Email already exists, automatically log in and return to the dashboard"));
    }

    const {results}: QueryReturn = await createNewPlayer(email, fullName, avatar, provider);

    return NextResponse.json(generateResponse(201, "Successfully created new account", results as any[]));
}

export async function PUT(request: NextRequest) {
    const {playerId, fullName, dateOfBirth, email, phoneNumber, socialLink} = await request.json();

    if (!playerId) {
        return NextResponse.json({
            status: 400,
            message: "Bad request, missing required parameter: playerId",
        });
    }

    if (!(await getPlayerStatus(playerId))) {
        return NextResponse.json({
            status: 202,
            message: "Data was found, but no changes were made because this player status was disabled",
        });
    }

    if (!isPlayerExists(playerId)) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any player with playerId ${playerId}`,
        });
    }

    const listOfRequiredFields = [
        !fullName && "fullName",
        !dateOfBirth && "dateOfBirth",
        !email && "email",
        !phoneNumber && "phoneNumber",
        !socialLink && "socialLink",
    ].filter((field) => field);

    if (listOfRequiredFields.length > 0) {
        return NextResponse.json({status: 400, message: `Bad request, missing required parameter: ${listOfRequiredFields.join(", ")}`});
    }

    const putData: IPlayers = {
        playerId,
        fullName,
        dateOfBirth,
        email,
        phoneNumber,
        socialLink,
    };

    if (await updatePlayerInfo(putData)) {
        return NextResponse.json({status: 200, message: `Successfully edit information of player ${playerId}`});
    }

    return NextResponse.json({status: 404, message: "Have some problem while updating player info"});
}

export async function PATCH(request: NextRequest) {
    const {playerId, isActive, jwtToken} = await request.json();

    if (!playerId) {
        return NextResponse.json({
            status: 400,
            message: "Bad request, missing required parameter: playerId",
        });
    }

    if (!isPlayerExists(playerId)) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any player with playerId ${playerId}`,
        });
    }

    if (isActive && jwtToken) {
        return NextResponse.json({
            status: 400,
            message: "Bad request, you can only update 1 field per request",
        });
    }

    if (!jwtToken && !isActive) {
        return NextResponse.json({
            status: 202,
            message: "Data was found, but no changes were made because no fields were mentioned",
        });
    }

    if (isActive) {
        await updatePlayerStatus(playerId, 1);
        return NextResponse.json({
            status: 200,
            message: `Successfully reactivated playerId ${playerId}`,
        });
    }

    if (!(await getPlayerStatus(playerId))) {
        return NextResponse.json({
            status: 202,
            message: "Data was found, but no changes were made because this player status was disabled",
        });
    }

    await updatePlayerJWTToken(playerId, jwtToken);

    return NextResponse.json({
        status: 200,
        message: `Successfully set new token to player ${playerId}`,
    });
}

export async function DELETE(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const playerId = searchParams.get("playerId");

    if (!playerId) {
        return NextResponse.json({
            status: 400,
            message: "Bad request, missing required parameter: playerId",
        });
    }

    if (!(await isPlayerExists(playerId))) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any player with playerId ${playerId}`,
        });
    }

    if (!(await getPlayerStatus(playerId))) {
        return NextResponse.json({
            status: 203,
            message: "This player is currently disabled",
        });
    }

    await updatePlayerStatus(playerId, 0);
    return NextResponse.json({
        status: 200,
        message: `Successfully disabled player ${playerId}`,
    });
}
