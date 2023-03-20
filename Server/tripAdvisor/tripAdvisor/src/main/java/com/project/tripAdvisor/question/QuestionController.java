package com.project.tripAdvisor.question;


import com.project.tripAdvisor.member.MemberRepository;
import com.project.tripAdvisor.response.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@Validated
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;

    private final QuestionMapper questionMapper;
    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    public QuestionController(QuestionService questionService, QuestionMapper questionMapper,
                              MemberRepository memberRepository, QuestionRepository questionRepository) {
        this.questionService = questionService;
        this.questionMapper = questionMapper;
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
    }

    /**
     * 질문 생성
     **/
    @PostMapping
    public ResponseEntity<Question> postQuestion(@Valid @RequestBody QuestionDto.Post requestBody, Principal principal){

//        User author = memberRepository.findByUsername(principal.getName());
//        requestBody.setAuthor(author);

        Question question = questionMapper.questionPostToQuestion(requestBody);
        Question createdQuestion = questionService.createQuestion(question);

        return new ResponseEntity(
                new SingleResponseDto<>(questionMapper.QuestionToQuestionResponse(createdQuestion)),
                HttpStatus.CREATED);

    }

}
