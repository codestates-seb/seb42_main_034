package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberFindService;
import com.project.tripAdvisor.member.service.MemberService;
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
import java.security.Principal;
import java.util.List;

@CrossOrigin
@RestController
@Validated
@RequestMapping("/questions/answer")
public class AnswerController {

    private final AnswerMapper answerMapper;

    private final AnswerService answerService;

    private final AnswerCommentMapper answerCommentMapper;

    private final QuestionService questionService;

    private final MemberService memberService;

    private final MemberFindService memberFindService;

    public AnswerController(AnswerMapper answerMapper, AnswerService answerService,
                            AnswerCommentMapper answerCommentMapper,
                            QuestionService questionService,
                            MemberService memberService,
                            MemberFindService memberFindService) {
        this.answerMapper = answerMapper;
        this.answerService = answerService;
        this.answerCommentMapper = answerCommentMapper;
        this.questionService = questionService;
        this.memberService = memberService;
        this.memberFindService = memberFindService;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(Principal principal,
                                     @PathVariable("question-id") @Positive Long questionId,
                                     @RequestBody AnswerDto.Post requestbody) {
        Question question = questionService.findVerifiedQuestion(questionId);
        Answer answer = answerMapper.answerPostToAnswer(requestbody);
        Member member =memberFindService.findMyProfile(principal.getName());
        answerService.checkAuthorized(question,member);
        answer.setMember(member);
        answerService.createAnswer(answer, questionId);

        return new ResponseEntity(HttpStatus.CREATED);
    }


    @PatchMapping("/{answer-id}")
    public ResponseEntity patchAnswer(Principal principal,
                                      @PathVariable("answer-id") @Positive Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestbody) {
        requestbody.setAnswerId(answerId);

        Answer answer = answerMapper.answerPatchToAnswer(requestbody);
        answer = answerService.updateAnswer(answer, memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity(HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(Principal principal,
                                       @PathVariable("answer-id") @Positive Long answerId) {

        answerService.deleteAnswer(answerId, memberFindService.findMyProfile(principal.getName()).getId());

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
                                         Principal principal) {

        answerService.switchLike(answerId, memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity(HttpStatus.CREATED);
    }

    /******************************** 대댓글 *********************************/

    @PostMapping("/comments/{answer-id}")
    public ResponseEntity postAnswerComment(Principal principal,
                                            @PathVariable("answer-id")@Positive Long answerId,
                                            @RequestBody AnswerCommentDto.Post requestBody){

        AnswerComment answerComment = answerCommentMapper.AnswerCommentPostToAnswerComment(requestBody);
        Member member = memberFindService.findMyProfile(principal.getName());
        answerComment.setMember(member);
        answerService.createAnswerComment(answerComment,answerId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/comments/{comment-id}")
    public ResponseEntity patchAnswerComment(Principal principal,
                                             @PathVariable("comment-id")@Positive Long answerCommentId,
                                             @RequestBody AnswerCommentDto.Patch requestBody){
        requestBody.setCommentId(answerCommentId);

        AnswerComment answerComment = answerCommentMapper.AnswerCommentPatchToAnswerComment(requestBody);
        answerService.updateAnswerComment(answerComment,memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteAnswerComment(Principal principal,
                                              @PathVariable("comment-id")@Positive Long answerCommentId){
        answerService.deleteAnswerComment(answerCommentId,memberFindService.findMyProfile(principal.getName()).getId());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * 채택
     */

    @PostMapping("/select/{answer-id}")
    public ResponseEntity selectAnswer(@PathVariable("answer-id")@Positive Long answerId,
                                      Principal principal) {
        Member member = memberFindService.findMyProfile(principal.getName());
        answerService.selectAnswer(answerId, member.getId());

        return ResponseEntity.ok().build();
    }
}