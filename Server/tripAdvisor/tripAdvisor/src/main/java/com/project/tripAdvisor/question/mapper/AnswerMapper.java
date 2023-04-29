package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentResponseDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerDto;
import com.project.tripAdvisor.blog.entity.BlogAnswer;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {


    default Answer answerPostToAnswer(AnswerDto.Post requestBody) {
        if(requestBody==null){
            return null;
        }
//        Member member = new Member();
//        member.setId(requestBody.getMemberId());

        Answer answer = new Answer();
//        answer.setMember(member);
        answer.setContent(requestBody.getContent());

        return answer;
    }

    default Answer answerPatchToAnswer(AnswerDto.Patch requestBody) {
        if(requestBody == null){
            return null;
        }
//        Member member = new Member();
//        member.setId(requestBody.getMemberId());

        Answer answer = new Answer();
        answer.setId(requestBody.getAnswerId());
//        answer.setMember(member);
        answer.setContent(requestBody.getContent());

        return answer;
    }

//    @Mapping(source = "answer.id", target = "answerId")
//    @Mapping(source = "question.id", target = "questionId")
//    @Mapping(source = "member.id", target = "memberId")
    default AnswerDto.Response answerToAnswerResponse(Answer answer, List<AnswerCommentDto.Response> comments){
        AnswerDto.Response answerResponseDto = new AnswerDto.Response();
        answerResponseDto.setMemberId(answer.getMember().getId());
        answerResponseDto.setAnswerId(answer.getId());
        answerResponseDto.setChecked(answer.isChecked());
        answerResponseDto.setContent(answer.getContent());
        answerResponseDto.setComments(comments);
        return answerResponseDto;
    }

    default List<AnswerDto.Response> AnswersToAnswerResponses(List<Answer> answers){
       if(answers==null){
           return null;
       }
        List<AnswerDto.Response> list = new ArrayList<>(answers.size());
        for (Answer answer : answers) {
            List<AnswerComment> comments = answer.getComments();
            list.add(answerToAnswerResponse(answer, answerCommentsToAnswerCommentResponses(comments)));
        }
        return list;
    }

    default List<AnswerCommentDto.Response> answerCommentsToAnswerCommentResponses(List<AnswerComment> comments) {
        List<AnswerCommentDto.Response> list = new ArrayList<>( comments.size() );
        for ( AnswerComment comment : comments ) {
            list.add( AnswerCommentToAnswerCommentResponse(comment) );
        }

        return list;
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

//    default List<AnswerDto.Response> AnswersToAnswerResponses(List<Answer> answers) {
//        if(answers == null) {
//            return null;
//        }
//
//        List<AnswerDto.Response> list = new ArrayList<>(answers.size());
//        for (Answer answer : answers) {
//            List<>
//        }
//    }
}