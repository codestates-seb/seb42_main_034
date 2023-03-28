package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerCommentMapper {

    default AnswerComment AnswerCommentPostToAnswerComment(AnswerCommentDto.Post requestBody) {

        if ( requestBody == null ) {
            return null;
        }

//        Member member = new Member();
//        member.setId(requestBody.getMemberId());

        AnswerComment answerComment = new AnswerComment();
//        answerComment.setMember(member);
        answerComment.setContent( requestBody.getContent() );

        return answerComment;
    }

    default AnswerComment AnswerCommentPatchToAnswerComment(AnswerCommentDto.Patch requestBody) {

        if ( requestBody == null ) {
            return null;
        }
//
//        Member member = new Member();
//        member.setId(requestBody.getMemberId());

        AnswerComment answerComment = new AnswerComment();
        answerComment.setId(requestBody.getCommentId());
//        answerComment.setMember(member);
        answerComment.setContent( requestBody.getContent() );

        return answerComment;
    }

    default AnswerCommentDto.Response AnswerCommentToAnswerCommentResponse(AnswerComment answerComment) {
        if ( answerComment == null ) {
            return null;
        }

        Long commentId = answerComment.getId();
        String content = answerComment.getContent();
        String createdAt = answerComment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

        AnswerCommentDto.Response answerCommentResponse = new AnswerCommentDto.Response(commentId, content, createdAt);

        return answerCommentResponse;
    }

    default List<AnswerCommentDto.Response> AnswerCommentsToAnswerCommentResponses(List<AnswerComment> comments) {

        List<AnswerCommentDto.Response> list = new ArrayList<>( comments.size() );
        for ( AnswerComment answerComment : comments ) {
            list.add( AnswerCommentToAnswerCommentResponse( answerComment ) );
        }

        return list;
    }

//    AnswerComment AnswerCommentPostToAnswerComment(AnswerCommentDto.Post requestBody);
//
//    AnswerComment AnswerCommentPatchToAnswerComment(AnswerCommentDto.Patch requestBody);
//
//    AnswerCommentDto.Response AnswerCommentToAnswerCommentResponse(AnswerComment answerComment);
//
//    List<AnswerCommentDto.Response> AnswerCommentsToAnswerCommentResponses(List<AnswerComment> comments);
}