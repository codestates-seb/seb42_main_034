package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.question.dto.QuestionDto;
import com.project.tripAdvisor.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostToQuestion(QuestionDto.Post requestBody);
    Question questionPatchToQuestion(QuestionDto.Patch requestBody);
    QuestionDto.Response QuestionToQuestionResponse(Question question);

    // (추가) 질문 목록
}
