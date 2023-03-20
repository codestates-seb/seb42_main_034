package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.question.dto.QuestionDto;
import com.project.tripAdvisor.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostToQuestion(QuestionDto.Post requestBody);
    Question questionPatchToQuestion(QuestionDto.Patch requestBody);

    @Mapping(source = "question.id", target = "questionId")
    @Mapping(source = "question.member.nickname", target = "writer")
    QuestionDto.Response QuestionToQuestionResponse(Question question);

    // (추가) 질문 목록
    List<QuestionDto.Response> questionsToQuestionResponses(List<Question> questions);
}
