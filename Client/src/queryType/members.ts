export interface MemberInfo {
    memberId: number;
    name: string;
    address: string|null;
    totalCount: number;
    avatarUrl: string;
    location:{
        lat: string;
        lon: string;
    } | null;
}