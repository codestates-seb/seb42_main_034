package com.project.tripAdvisor.member;


import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member MemberPostToMember(MemberDto.Post memberPost);

    Member MemberPatchToMember(MemberDto.Patch memberPatch);
    MemberDto.Response MemberToMemberResponseDto(Member member);
}
