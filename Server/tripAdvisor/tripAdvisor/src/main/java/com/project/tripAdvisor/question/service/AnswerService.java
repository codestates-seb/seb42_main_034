package com.project.tripAdvisor.question.service;

import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.sevice.MemberService;
import com.project.tripAdvisor.question.entity.Answer;
import com.project.tripAdvisor.question.entity.AnswerComment;
import com.project.tripAdvisor.question.entity.AnswerLike;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.repository.AnswerCommentRepository;
import com.project.tripAdvisor.question.repository.AnswerLikeRepository;
import com.project.tripAdvisor.question.repository.AnswerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;

@Transactional
@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final AnswerCommentRepository answerCommentRepository;

    private final AnswerLikeRepository answerLikeRepository;
    private final MemberService memberService;
    private final QuestionService questionService;

    public AnswerService(AnswerRepository answerRepository, AnswerCommentRepository answerCommentRepository,
                         MemberService memberService, QuestionService questionService,
                         AnswerLikeRepository answerLikeRepository) {

        this.answerRepository = answerRepository;
        this.answerCommentRepository = answerCommentRepository;
        this.memberService = memberService;
        this.questionService = questionService;
        this.answerLikeRepository = answerLikeRepository;
    }

    /** 댓글(답변) 생성 **/
    public Answer createAnswer(Answer answer, Long questionId) {


        Question question = questionService.findVerifiedQuestion(questionId);
        Member member = memberService.findVerifiedMember(answer.getMember().getId());

        answer.setQuestion(question);
        answer.setMember(member);

        question.setAnswer(answer);

        return answerRepository.save(answer);

    }

    /** 댓글(답변) 수정 **/
    public Answer updateAnswer(Answer answer, Long memberId) {

        Answer updatedAnswer = findVerifiedAnswer(answer.getId());

        findAuthorization(updatedAnswer, memberId);

        Optional.ofNullable(answer.getContent()).ifPresent(content -> updatedAnswer.setContent(content));

        return answerRepository.save(updatedAnswer);
    }

    /** 댓글(답변) 삭제 **/
    public void deleteAnswer(Long answerId, Long memberId) {

        Answer answer = findVerifiedAnswer(answerId);
        findAuthorization(answer, memberId);

        answerRepository.deleteById(answerId);
    }

    /** 댓글(답변) 조회 ** => 필요한가? **/
    public Answer findAnswer(Long answerId) {
        return findVerifiedAnswer(answerId);
    }


    /** 댓글(답변) 목록 조회 **/
    public Page<Answer> findAnswers(Long questionId, int page) {
        return answerRepository.findByQuestionId(questionId, PageRequest.of(page, 15));
    }


    /** 댓글 좋아요 기능 **/

    public void switchLike(Long answerId, Long memberId) {

        Answer answer = findVerifiedAnswer(answerId);
        Member member = memberService.findVerifiedMember(memberId);

        AnswerLike answerLike = new AnswerLike();

        answerLike.setMember(member);
        answerLike.setAnswer(answer);
        Optional<AnswerLike> optionalAnswerLike = answerLikeRepository.findByMemberAndAnswer(memberId,answerId);
        int likeCnt = answer.getLikeCnt();

        if (optionalAnswerLike.isEmpty()) {
            addAnswerLike(answer, answerLike, likeCnt);
        } else {
            addAnswerLikeIfLikeType(answer, optionalAnswerLike, likeCnt);
        }
    }


    private void addAnswerLikeIfLikeType(Answer answer, Optional<AnswerLike> optionalAnswerLike, int likeCnt) {
        AnswerLike findAnswerLike = optionalAnswerLike.get();
        boolean likeType = findAnswerLike.isLikeType();


        if(!likeType){
            likeCnt+=1;
            answer.setLikeCnt(likeCnt);
            findAnswerLike.setLikeType(true);
            answerRepository.save(answer);
        }
    }


    private void addAnswerLike(Answer answer, AnswerLike answerLike, int likeCnt) {
        answerLike.setLikeType(true);
        likeCnt++;
        answer.setLikeCnt(likeCnt);
        answerLikeRepository.save(answerLike);
        answerRepository.save(answer);

    }



    /******************************** 대댓글 *********************************/

    /** 대댓글 작성 **/
    public AnswerComment createAnswerComment(AnswerComment answerComment,Long answerId){

        Answer answer = findVerifiedAnswer(answerId);
        answerComment.setAnswer(answer);

        Member member = memberService.findVerifiedMember(answerComment.getMember().getId());
        answerComment.setMember(member);

        Question question = answer.getQuestion();

        int commentCnt = question.getCommentCnt();
        question.setCommentCnt(commentCnt+1);

        return answerCommentRepository.save(answerComment);
    }

    /** 대댓글 수정 **/
    public AnswerComment updateAnswerComment(AnswerComment answerComment, Long memberId){
        AnswerComment findAnswerComment = findVerifiedAnswerComment(answerComment.getId());
        if (answerComment.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        Optional.ofNullable(answerComment.getContent())
                .ifPresent(content->findAnswerComment.setContent(content));

        return answerCommentRepository.save(findAnswerComment);
    }

    /** 대댓글 삭제 **/
    public void deleteAnswerComment(Long commentId,Long memberId){
        AnswerComment answerComment = findVerifiedAnswerComment(commentId);
        if (answerComment.getMember().getId()!=memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_UNAUTHORIZED);
        }

        Answer answer = findVerifiedAnswer(answerComment.getAnswer().getId());
        Question question = answer.getQuestion();
        int commentCnt = question.getCommentCnt();
        question.setCommentCnt(commentCnt-1);

        answerCommentRepository.delete(answerComment);
    }


    public AnswerComment findVerifiedAnswerComment(Long commentId){
        Optional<AnswerComment> optionalAnswerComment =
                answerCommentRepository.findById(commentId);
        AnswerComment findAnswerComment=
                optionalAnswerComment.orElseThrow(()->
                        new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return findAnswerComment;
    }


    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer =
                answerRepository.findById(answerId);
        Answer findAnswer =
                optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));

        return findAnswer;
    }

    /** 수정, 삭제 시 권한 확인1 **/

    public void findAuthorization(Answer answer, Long memberId) {
        if(!Objects.equals(answer.getMember().getId(), memberId))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
    }

    /** 수정, 삭제 시 권한 확인2 **/
    public void findAuthorization(AnswerComment answerComment, Long memberId) {
        if(!Objects.equals(answerComment.getMember().getId(), memberId))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED_USER);
    }
}