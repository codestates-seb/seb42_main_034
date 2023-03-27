package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AnswerMapper {


    default Answer answerPostToAnswer(AnswerDto.Post requestBody) {
        if(requestBody==null){
            return null;
        }
        Member member = new Member();
        member.setId(requestBody.getMemberId());

        Answer answer = new Answer();
        answer.setMember(member);
        answer.setContent(requestBody.getContent());

        return answer;
    }

    default Answer answerPatchToAnswer(AnswerDto.Patch requestBody) {
        if(requestBody == null){
            return null;
        }
        Member member = new Member();
        member.setId(requestBody.getMemberId());

        Answer answer = new Answer();
        answer.setId(requestBody.getAnswerId());
        answer.setMember(member);
        answer.setContent(requestBody.getContent());

        return answer;
    }

    @Mapping(source = "answer.id", target = "answerId")
    @Mapping(source = "question.id", target = "questionId")
    @Mapping(source = "member.id", target = "memberId")
    AnswerDto.Response answerToAnswerResponse(Answer answer);

    List<AnswerDto.Response> AnswersToAnswerResponses(List<Answer> answers);


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

