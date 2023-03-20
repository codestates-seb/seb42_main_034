package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerCommentMapper {
    Answer answerCommentPostToAnswer(AnswerCommentDto.Post requestBody);

    Answer answerCommentPatchToAnswer(AnswerCommentDto.Patch requestBody);

    AnswerDto.Response AnswerToAnswerCommentResponse(AnswerComment answerComment);
}