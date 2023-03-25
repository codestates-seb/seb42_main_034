package com.project.tripAdvisor.question.mapper;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.dto.QuestionDto;
import com.project.tripAdvisor.question.entity.Question;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface QuestionMapper {

    Question questionPostToQuestion(QuestionDto.Post requestBody);

 //   Question questionPatchToQuestion(QuestionDto.Patch requestBody);

   // @Mapping(source = "question.member.nickname", target = "writer")
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

    @Mapping(source = "question.id", target = "questionId")
    @Mapping(source = "question.member.nickname", target = "writer")
    QuestionDto.Response QuestionToQuestionResponse(Question question);

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