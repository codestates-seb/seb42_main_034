package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {
    Answer answerPostToAnswer(AnswerDto.Post requestBody);

    Answer answerPatchToAnswer(AnswerDto.Patch requestBody);

    AnswerDto.Response answerToAnswerResponse(Answer answer);
}

