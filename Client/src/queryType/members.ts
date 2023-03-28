export interface MemberInfo {
    memberId: number;
    name: string;
    nickname: string;
    address: string|null;
    totalCount: number;
    avatarUrl: string;
    location:{
        lat: string;
        lon: string;
    } | null;
}