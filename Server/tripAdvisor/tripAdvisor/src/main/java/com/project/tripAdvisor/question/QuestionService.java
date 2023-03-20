package com.project.tripAdvisor.question;

import org.springframework.stereotype.Service;

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
}
