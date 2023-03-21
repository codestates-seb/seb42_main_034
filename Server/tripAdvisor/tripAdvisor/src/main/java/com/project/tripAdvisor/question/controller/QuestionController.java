package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberService;
import com.project.tripAdvisor.question.dto.QuestionDto;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.mapper.QuestionMapper;
import com.project.tripAdvisor.question.service.QuestionService;
import com.project.tripAdvisor.response.*;
import lombok.Builder;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@Validated
@RequestMapping("/questions")
@CrossOrigin
@Builder
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    private final MemberService memberService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper,
                              MemberService memberService) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberService = memberService;
    }

    /**
     * 질문 생성
     **/
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionDto.Post requestBody){

        Question question = questionMapper.questionPostToQuestion(requestBody);

        Member member = memberService.findVerifiedMember(requestBody.getMemberId());
        question.setMember(member);

        Question createdQuestion = questionService.createQuestion(question);

        return new ResponseEntity(
                new SingleResponseDto<>(questionMapper.QuestionToQuestionResponse(createdQuestion)),
                HttpStatus.CREATED);
    }

    /**
     * 질문 수정
     **/
    @PatchMapping("/{question-id}")
    public ResponseEntity patchQuestion(@PathVariable("question-id") @Positive Long questionId,
                                        @RequestBody QuestionDto.Patch requestBody) {

        Question question = questionMapper.questionPatchToQuestion(requestBody);

        requestBody.setQuestionId(questionId);

        Member member = memberService.findVerifiedMember(requestBody.getMemberId());

        Question updatedQuestion = questionService.updateQuestion(question, member);



        return new ResponseEntity(
                new SingleResponseDto<>(questionMapper.QuestionToQuestionResponse(updatedQuestion)),
                HttpStatus.OK);
    }

    /**
     * 질문 상세 조회
     **/
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive Long questionId) {
        Question gotQuestion = questionService.findQuestion(questionId);



        return new ResponseEntity(
                new SingleResponseDto<>(questionMapper.QuestionToQuestionResponse(gotQuestion)),
                HttpStatus.OK);
    }

    /**
     * 질문 목록 조회
     **/
    public ResponseEntity getQuestions(@RequestParam int page) {
        Page<Question> pageQuestions = questionService.findQuestions(page - 1);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        questionMapper.questionsToQuestionResponses(questions),
                        pageQuestions),
                HttpStatus.OK);
    }

    /**
     * 질문 삭제
     **/

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive Long questionId,
                                         @RequestParam Long memberId) {
        questionService.deleteQuestion(questionId, memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}