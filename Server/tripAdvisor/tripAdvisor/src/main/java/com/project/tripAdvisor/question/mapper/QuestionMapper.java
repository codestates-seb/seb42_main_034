package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.QuestionDto;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.tag.entity.QuestionTag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    //  @Mapping(source = "question.member.nickname", target = "writer")
    default Question questionPostToQuestion(QuestionDto.Post requestBody) {
        if(requestBody == null) {
            return null;
        }

        Member member = new Member();
        member.setId(requestBody.getMemberId());

        Question question = new Question();
        question.setTitle(requestBody.getTitle());
        question.setCategory(requestBody.getCategory());
        question.setContent(requestBody.getContent());
        //question.setQuestionTags((QuestionTag) requestBody.getTags());

        return question;

    }


    default Question questionPatchToQuestion(QuestionDto.Patch requestBody) {
        if (requestBody == null) {
            return null;
        }
        Member member = new Member();
        member.setId(requestBody.getMemberId());

        Question question = new Question();
        question.setMember(member);
        question.setTitle(requestBody.getTitle());
        question.setContent(requestBody.getContent());

        return question;
    }

    //    @Mapping(source = "question.id", target = "questionId")
    @Mapping(source = "question.member.nickname", target = "writer")
    default QuestionDto.Response QuestionToQuestionResponse(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDto.Response response = new QuestionDto.Response();

        response.setQuestionId(question.getId());
        response.setContent(question.getContent());
        response.setTitle(question.getTitle());
        response.setViewCnt(question.getViewCnt());
        response.setCreatedAt(question.getCreatedAt());
        response.setWriter(question.getMember().getNickname());

        return response;
    }
    // 질문 목록 조회
    @Mapping(source = "question.member.nickname", target = "writer")
    default QuestionDto.SearchResponse QuestionToQuestionSearchResponse(Question question) {

        QuestionDto.SearchResponse response = new QuestionDto.SearchResponse();
        response.setQuestionId(question.getId());
        response.setTitle(question.getTitle());
        response.setWriter(question.getMember().getNickname());
        response.setCreatedAt(question.getCreatedAt());

        return response;
    }

    default List<QuestionDto.SearchResponse> QuestionToQuestionSearchResponses(List<Question> questions) {
        if(questions == null) {
            return null;
        }
        List<QuestionDto.SearchResponse> list = new ArrayList<>(questions.size());
        for(Question question : questions) {
            list.add(QuestionToQuestionSearchResponse(question));
        }
        return list;
    }


    default List<String> QuestionToTagName(Question question) {
        return question.getQuestionTags().stream()
                .map(questionTag -> (questionTag.getTag().getName()))
                .collect(Collectors.toList());
    }
}