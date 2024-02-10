import {NextRequest, NextResponse} from "next/server";
import {
    createNewTeam,
    getAllTeams,
    getTeamInfoById,
    getTeamsOnPage, isTeamActive,
    isTeamExist,
    isTeamOwner,
    IUpdateTeam, searchTeamsByName,
    updateTeamInfo, updateTeamStatus
} from "@/app/api/teams/handle";
import {onlyNumberRegex} from "@/utils/regex";

export async function GET(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams
    const teamId = searchParams.get('teamId');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit') || process.env.TABLE_PAGINATION_DEFAULT!;

    const search = searchParams.get('search');

    if (search) {
        const {results: searchData, length} = await searchTeamsByName(search);
        return NextResponse.json({
            status: 200,
            message: `Successfully get ${length} team(s) with matching names`,
            data: searchData
        })
    }

    const {results: teamsData, length: totalRow} = await getAllTeams();

    if (teamId) {
        if (!onlyNumberRegex.test(teamId)) {
            return NextResponse.json({status: 400, message: "The value of the `teamId` parameter is invalid"})
        }

        const {results: teamData, length} = await getTeamInfoById(teamId);
        if (length === 0) {
            return NextResponse.json({status: 204, message: `Could not find any team with teamId ${teamId}`})
        }
        return NextResponse.json({status: 200, message: `Successfully get information of team ${teamId}`, data: teamData})
    }

    if (page) {
        if (!onlyNumberRegex.test(page)) {
            return NextResponse.json({
                status: 400,
                message: "The value of the `page` parameter is invalid",
            })
        }

        const {results: teamsData, length} = await getTeamsOnPage(page, limit);

        if (length === 0) {
            return NextResponse.json({
                status: 204,
                message: `Not enough team data to create page ${page}`,
                totalRow,
                totalPage: Math.ceil(totalRow / Number(limit)),
                currentPage: Number(page),
            });
        }

        return NextResponse.json({
            status: 200,
            message: `Successfully get information of ${length} teams on page ${page}`,
            length,
            totalRow,
            totalPage: Math.ceil(totalRow / Number(limit)),
            currentPage: Number(page),
            data: teamsData
        });
    }

    if (totalRow === 0) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any teams to return`
        })

    }

    return NextResponse.json({
        status: 200,
        message: `Successfully get information of ${totalRow} team(s)`,
        length: totalRow,
        data: teamsData
    })
}

export async function POST(request: NextRequest) {

    const {teamName, teamLogo, teamOwner} = await request.json();

    const requiredFields = [
        !teamName && "teamName",
        !teamLogo && "teamLogo",
        !teamOwner && "teamOwner"
    ].filter(field => field);

    if (requiredFields.length > 0) {
        return NextResponse.json({status: 200, message: `Missing required fields: ${requiredFields.join(", ")}`})
    }
    try {
        const {results} = await createNewTeam(teamName, teamLogo, teamOwner);

        return NextResponse.json({status: 201, message: "Successfully created new team", data: results})
    } catch (err: any) {
        return NextResponse.json({status: 400, errorCode: `${err.errorCode} - ${err.errorMessage}`})
    }
}

export async function PUT(request: NextRequest) {

    const {teamId, teamName, teamLogo, currentId} = await request.json();

    if (!teamId) {
        return NextResponse.json({
            status: 400,
            message: "Bad request, missing required parameter: `teamId`"
        })
    }

    if (!await isTeamExist(teamId)) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any team with teamId ${teamId}`
        })
    }

    const requiredFields = [
        !teamName && "teamName",
        !teamLogo && "teamLogo",
        !currentId && "currentId"
    ].filter(field => field);

    if (requiredFields.length > 0) {
        return NextResponse.json({
            status: 400,
            message: `Bad request, missing required parameter: ${requiredFields.join(", ")}`
        })
    }

    if (!await isTeamOwner(teamId, currentId)) {
        return NextResponse.json({
            status: 204,
            message: `Forbidden, you are not allowed to change team info`
        })
    }

    const updateData: IUpdateTeam = {
        teamId,
        teamName,
        teamLogo
    }

    await updateTeamInfo(updateData);

    return NextResponse.json({status: 200, message: `Successfully edit information of team ${teamId}`})
}

export async function DELETE(request: NextRequest) {

    const searchParams = request.nextUrl.searchParams

    const teamId = searchParams.get('teamId');
    const currentId = searchParams.get('currentId');

    const requiredFields = [
        !teamId && 'teamId',
        !currentId && 'currentId'
    ].filter(field => field);

    if (requiredFields.length > 0) {
        return NextResponse.json({
            status: 400,
            message: `Bad request, missing required parameter: ${requiredFields.join(", ")}`
        })
    }

    if (!await isTeamExist(teamId!)) {
        return NextResponse.json({
            status: 204,
            message: `Could not find any team with teamId ${teamId}`
        })
    }

    if (!await isTeamOwner(teamId!, currentId!)) {
        return NextResponse.json({
            status: 204,
            message: `Forbidden, you are not allowed to change team info`
        })
    }

    if (await isTeamActive(teamId!)) {
        return NextResponse.json({
            status: 203,
            message: "This team is currently disabled"
        })
    }

    await updateTeamStatus(teamId!, 0);

    return NextResponse.json({status: 200, message: "Successfully disabled this team"})
}