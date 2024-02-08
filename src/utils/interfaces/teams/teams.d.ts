export type TeamRole = "OWN" | "HC" | "AC" | "GC" | "TA" | "CT" | "VCT" | "MB";
export type PreferredFoot = "left" | "right" | "both"
export interface ITeam {
    teamId?: string | number;
    teamName?: string;
    teamLogo?: string;
    teamOwner?: string | number;
    createdAt?: string;
    updatedAt?: string;
    isActive?: number;
}

export interface ITeamMember {
    teamId?: string | number;
    playerId?: string | number;
    role?: TeamRole;
    position?: string;
    jerseyNumber?: string;
    height?: number;
    weight?: number;
    preferredFoot?:PreferredFoot;
    joinDate?: string;
    outDate?: string
}