package com.project.tripAdvisor.question;


import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.springframework.security.core.userdetails.User;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostToQuestion(QuestionDto.Post requestBody);
    Question questionPatchToQuestion(QuestionDto.Patch requestBody);
    QuestionDto.Response QuestionToQuestionResponse(Question question);

//    Question userToQuestion(User user);
   /* List<QuestionDto.Response> QuestionsToQuestionResponseDto(List<Question> questions);*/

//    List<QuestionDto.MemberQuestionResponse> MemberQuestionListDto(List<Question> questions);

    // (추가) 질문 목록
}