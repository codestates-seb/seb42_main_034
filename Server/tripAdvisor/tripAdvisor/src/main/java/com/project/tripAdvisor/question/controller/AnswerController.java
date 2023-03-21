package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberService;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.mapper.AnswerCommentMapper;
import com.project.tripAdvisor.question.mapper.AnswerMapper;
import com.project.tripAdvisor.question.service.AnswerService;
import com.project.tripAdvisor.question.service.QuestionService;
import com.project.tripAdvisor.response.SingleResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/answers")
public class AnswerController {

    private final AnswerMapper answerMapper;

    private final AnswerService answerService;

    private final AnswerCommentMapper answerCommentMapper;

    private final QuestionService questionService;

    private final MemberService memberService;

    public AnswerController(AnswerMapper answerMapper, AnswerService answerService,
                            AnswerCommentMapper answerCommentMapper,
                            QuestionService questionService,
                            MemberService memberService) {
        this.answerMapper = answerMapper;
        this.answerService = answerService;
        this.answerCommentMapper = answerCommentMapper;
        this.questionService = questionService;
        this.memberService = memberService;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive Long questionId,
                                         @RequestBody AnswerDto.Post requestbody) {

//ver.1
//        Answer answer = answerMapper.answerPostToAnswer(requestbody);
//        answerService.createAnswer(answer, questionId);
//
//        return new ResponseEntity<>(
//                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer))
//                , HttpStatus.OK);
//
////        return new ResponseEntity<>(HttpStatus.CREATED);
//    }


//ver.2
//
        Answer answer = answerMapper.answerPostToAnswer(requestbody);

        // 입력받은 questionId 로 question 찾아서 answer 넣기
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        findQuestion.setAnswer(answer);

        // member 넣기
        Member findMember = memberService.findVerifiedMember(requestbody.getMemberId());
        answer.setMember(findMember);


        return new ResponseEntity<>(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer))
                , HttpStatus.OK);
    }

    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestbody) {
        requestbody.setAnswerId(answerId);

        Answer answer = answerMapper.answerPatchToAnswer(requestbody);
        answer = answerService.updateAnswer(answer, answer.getMember().getMemberId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer))
                , HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity findAnswer(@PathVariable("answer-id") @Positive Long answerId) {
        Answer response = answerService.findAnswer(answerId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(response))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                       @RequestParam @Positive Long memberId) {

        answerService.deleteAnswer(answerId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
