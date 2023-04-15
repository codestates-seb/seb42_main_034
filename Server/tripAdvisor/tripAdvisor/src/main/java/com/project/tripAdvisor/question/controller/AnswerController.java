package com.project.tripAdvisor.question.controller;

import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.service.MemberFindService;
import com.project.tripAdvisor.member.service.MemberService;
import com.project.tripAdvisor.question.dto.AnswerCommentDto;
import com.project.tripAdvisor.question.dto.AnswerDto;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
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

        Answer answer = answerMapper.answerPostToAnswer(requestbody);
        Member member =memberFindService.findMyProfile(principal.getName());
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
     * 박형빈
     */

//    @PostMapping("/check/{answer-id}")
//    public ResponseEntity checkAnswer(@PathVariable("answer-id")@Positive Long answerId,
//                                      Principal principal)
//    {
//        Member member = memberFindService.findMyProfile(principal.getName());
//        Answer answer = answerService.findVerifiedAnswer(answerId);
//        /**
//         * 이부분도 서비스단에서 repo를 이용해 찾게끔 수정하셔야 할듯 합니다.
//         */
//        Question question = answer.getQuestion();
//        /**
//         * 채택 요청을 한 MemberId와 해당 answer를 보유한 question의 MemberId와 비교하여 권한 체크
//         * 추후 서비스단에서 하도록 처리해주세요 전체 로직 볼 수 있게 그냥 임의로 적은 코드입니다.
//         */
//        if(!Objects.equals(answer.getQuestion().getMember().getId(), member.getId()))
//        {
//            return new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED));
//        }
//
//        answer.setChecked(true);
//        question.setChecked(true);
//
//        return ResponseEntity.ok().build();
//    }
}