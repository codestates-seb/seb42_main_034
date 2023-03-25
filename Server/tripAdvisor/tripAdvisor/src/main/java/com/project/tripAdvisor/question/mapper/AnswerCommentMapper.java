package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerCommentMapper {
    AnswerComment AnswerCommentPostToAnswerComment(AnswerCommentDto.Post requestBody);

    AnswerComment AnswerCommentPatchToAnswerComment(AnswerCommentDto.Patch requestBody);

    AnswerCommentDto.Response AnswerCommentToAnswerCommentResponse(AnswerComment answerComment);

    List<AnswerCommentDto.Response> AnswerCommentsToAnswerCommentResponses(List<AnswerComment> comments);
}