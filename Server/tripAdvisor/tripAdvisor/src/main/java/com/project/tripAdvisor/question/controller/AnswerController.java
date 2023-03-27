package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPatchDto;
import com.project.tripAdvisor.blog.dto.BlogAnswerCommentPostDto;
import com.project.tripAdvisor.blog.entity.BlogAnswerComment;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberService;
import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.mapper.AnswerCommentMapper;
import com.project.tripAdvisor.question.mapper.AnswerMapper;
import com.project.tripAdvisor.question.service.AnswerService;
import com.project.tripAdvisor.question.service.QuestionService;
import com.project.tripAdvisor.response.MultiResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

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

        Answer answer = answerMapper.answerPostToAnswer(requestbody);
        answerService.createAnswer(answer, questionId);

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer))
                , HttpStatus.OK);
    }


    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestbody) {
        requestbody.setAnswerId(answerId);

        Answer answer = answerMapper.answerPatchToAnswer(requestbody);
        answer = answerService.updateAnswer(answer, answer.getMember().getId());

        return new ResponseEntity<>(
                new SingleResponseDto<>(answerMapper.answerToAnswerResponse(answer))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") @Positive Long answerId,
                                       @RequestParam @Positive Long memberId) {

        answerService.deleteAnswer(answerId, memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 질문_댓글 조회
     */
    @GetMapping("/{question-id}")
    public ResponseEntity findAnswer(@PathVariable("question-id") @Positive Long questionId,
                                     @RequestParam int page) {
        Page<Answer> pageAnswer = answerService.findAnswers(questionId, page - 1);
        List<Answer> answers = pageAnswer.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(answerMapper.AnswersToAnswerResponses(answers),
                        pageAnswer)
                , HttpStatus.OK);
    }


    /** 댓글 좋아요 기능 **/
    @PostMapping("like/{answer-id}")
    public ResponseEntity postAnswerLike(@Positive @PathVariable("answer-id") Long answerId,
                                         @Positive @RequestParam Long memberId) {

        answerService.switchLike(answerId, memberId);

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /******************************** 대댓글 *********************************/

    @PostMapping("/comments/{answer-id}")
    public ResponseEntity postAnswerComment(@PathVariable("answer-id")@Positive Long answerId,
                                            @RequestBody AnswerCommentDto.Post requestBody){
        AnswerComment answerComment = answerCommentMapper.AnswerCommentPostToAnswerComment(requestBody);
        answerService.createAnswerComment(answerComment,answerId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchAnswerComment(@PathVariable("comment-id")@Positive Long answerCommentId,
                                                 @RequestBody AnswerCommentDto.Patch requestBody){
        requestBody.setCommentId(answerCommentId);

        AnswerComment answerComment = answerCommentMapper.AnswerCommentPatchToAnswerComment(requestBody);
        answerService.updateAnswerComment(answerComment,answerComment.getMember().getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteAnswerComment(@PathVariable("comment-id")@Positive Long answerCommentId,
                                                  @RequestParam @Positive Long memberId){
        answerService.deleteAnswerComment(answerCommentId,memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
