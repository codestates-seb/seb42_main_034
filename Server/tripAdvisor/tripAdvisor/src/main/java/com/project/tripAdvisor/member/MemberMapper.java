package com.project.tripAdvisor.member;


import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member MemberPostToMember(MemberDto.Post memberPost);

    Member MemberPatchToMember(MemberDto.Patch memberPatch);
    MemberDto.Response MemberToMemberResponseDto(Member member);

    List<MemberDto.MemberQuestionResponse> QuestionsToMemberQuestionsResponseDtos(List<Question> questions);

    List<MemberDto.MemberBlogResponse> BlogsToMemberBlogsResponseDtos(List<Blog> blogs);



}
