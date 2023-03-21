package com.project.tripAdvisor.question.service;


import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.question.mapper.QuestionMapper;
import com.project.tripAdvisor.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public QuestionService(QuestionRepository questionRepository, QuestionMapper questionMapper) {
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    /** 질문 생성 **/
    public Question createQuestion(Question question) {

        Question createdQuestion = questionRepository.save(question);

        return createdQuestion;
    }

    /** 질문 수정 **/

    public Question updateQuestion(Question question, Member member) {
        Question updatedQuestion = findVerifiedQuestion(question.getId());

        if(updatedQuestion.getMember().getId() != question.getMember().getId()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }

        // (추가) 채택 된 질문인 경우 수정 불가

        updatedQuestion.setTitle(question.getTitle());
        updatedQuestion.setContent(question.getContent());

        return questionRepository.save(updatedQuestion);

    }

    /** 질문 삭제 **/

    public void deleteQuestion(Long questionId, Long memberId) {
        Question deletedQuestion = findVerifiedQuestion(questionId);

        if(deletedQuestion.getMember().getId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_MATCH);
        }

        questionRepository.deleteById(questionId);
    }

    /** 질문 상세 조회 **/

    public Question findQuestion(Long questionId) {
        Question findQuestion = findVerifiedQuestion(questionId);

        String writer = findQuestion.getMember().getNickname();
        int viewCnt = findQuestion.getViewCnt();

        findQuestion.setViewCnt(viewCnt + 1); // 조회수 1 증가
        findQuestion.setWriter(writer);

        return findQuestion;
    }

    /** 질문 목록 조회 **/
    /** (추가) 정렬 기준 **/

    public Page<Question> findQuestions(int page) {

        return questionRepository.findAll(PageRequest.of(page, 20,
                Sort.by("createdAt").descending())); // Default : 최신 순
    }


    /** 질문 검색 **/
    // Default : 제목 + 내용 으로 검색
    // (추가) user 로 검색

    public Page<Question> searchQuestion(int page, String keyword) {
        keyword = "%" + keyword + "%";

        return questionRepository.findByTitleOrContent(keyword, keyword, PageRequest.of(page, 20));
    }


    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);
        Question findQuestion = optionalQuestion
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));

        return findQuestion;
    }
}

