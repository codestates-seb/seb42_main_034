package com.project.tripAdvisor.member;


import com.project.tripAdvisor.question.Question;
import com.project.tripAdvisor.question.QuestionMapper;
import com.project.tripAdvisor.question.QuestionRepository;
import com.project.tripAdvisor.response.MultiResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    private final MemberRepository memberRepository;
    private final QuestionRepository questionRepository;
    private final QuestionMapper questionMapper;

    public MemberController(MemberService memberService, MemberMapper mapper,
                            MemberRepository memberRepository, QuestionRepository questionRepository,
                            QuestionMapper questionMapper) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
        this.questionRepository = questionRepository;
        this.questionMapper = questionMapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost){
        Member member = mapper.MemberPostToMember(memberPost); //MemberDto ---> 이제 우리는 Member로 로직처리

        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(createMember)), HttpStatus.CREATED);
    }

    @PatchMapping("{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long memberId,
                                      @RequestBody MemberDto.Patch memberPatch){
        memberPatch.setMemberId(memberId);

        Member member = mapper.MemberPatchToMember(memberPatch);
        Member updateMember = memberService.updateMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(updateMember)),HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long memberId) {
        Member member = memberService.findMember(memberId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(member))
                , HttpStatus.OK);
    }


    @DeleteMapping("{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

   /* @GetMapping("/member-questions")//질문조회
    public ResponseEntity getMemberQuestions(@Positive@RequestParam int page,
                                                             @Positive @RequestParam int size,
                                                             Principal principal){

        User author = memberRepository.findByUsername(principal.getName());
//        List<Question> questions1 = (List<Question>) questionRepository.findByAuthor(author, PageRequest.of(page, size,
//                Sort.by("createdAt").descending()));

        Question question = questionMapper.userToQuestion(author);
        Page<Question> MemberQuestions = questionRepository.findByAuthor(question, PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
        List<Question> questions = MemberQuestions.getContent();


//        Page<Question> pageQuestions = memberService.getMemberQuestions(page -1, size);
//        List<Question> Questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        questionMapper.MemberQuestionListDto(questions), MemberQuestions), HttpStatus.OK);
    }*/


}
