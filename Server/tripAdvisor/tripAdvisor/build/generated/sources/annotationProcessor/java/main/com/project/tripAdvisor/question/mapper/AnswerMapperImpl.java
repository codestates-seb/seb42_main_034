package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.AnswerDto.Response;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.Question;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-03-28T01:56:21+0900",
    comments = "version: 1.4.2.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.6.1.jar, environment: Java 11.0.17 (Azul Systems, Inc.)"
)
@Component
public class AnswerMapperImpl implements AnswerMapper {

    @Override
    public Response answerToAnswerResponse(Answer answer) {
        if ( answer == null ) {
            return null;
        }

        Response response = new Response();

        response.setAnswerId( answer.getId() );
        response.setQuestionId( answerQuestionId( answer ) );
        response.setMemberId( answerMemberId( answer ) );
        response.setContent( answer.getContent() );
        response.setLikeCnt( answer.getLikeCnt() );
        response.setChecked( answer.isChecked() );

        return response;
    }

    @Override
    public List<Response> AnswersToAnswerResponses(List<Answer> answers) {
        if ( answers == null ) {
            return null;
        }

        List<Response> list = new ArrayList<Response>( answers.size() );
        for ( Answer answer : answers ) {
            list.add( answerToAnswerResponse( answer ) );
        }

        return list;
    }

    private Long answerQuestionId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Question question = answer.getQuestion();
        if ( question == null ) {
            return null;
        }
        Long id = question.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }

    private Long answerMemberId(Answer answer) {
        if ( answer == null ) {
            return null;
        }
        Member member = answer.getMember();
        if ( member == null ) {
            return null;
        }
        long id = member.getId();
        return id;
    }
}
