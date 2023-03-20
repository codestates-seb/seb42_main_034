package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.mapper.AnswerCommentMapper;
import com.project.tripAdvisor.question.mapper.AnswerMapper;
import com.project.tripAdvisor.question.service.AnswerService;
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

    public AnswerController(AnswerMapper answerMapper, AnswerService answerService,
                            AnswerCommentMapper answerCommentMapper) {
        this.answerMapper = answerMapper;
        this.answerService = answerService;
        this.answerCommentMapper = answerCommentMapper;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive Long questionId,
                                         @RequestBody AnswerDto.Post requestbody) {

        Answer answer = answerMapper.answerPostToAnswer(requestbody);
        answer = answerService.createAnswer(answer, questionId);

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
