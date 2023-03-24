package com.project.tripAdvisor.member;

import com.project.tripAdvisor.question.dto.QuestionResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
@CrossOrigin
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    private final MemberRepository memberRepository;

    public MemberController(MemberService memberService, MemberMapper mapper,
                            MemberRepository memberRepository) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost){
        Member member = mapper.MemberPostToMember(memberPost); //MemberDto ---> 이제 우리는 Member로 로직처리

        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(createMember)), HttpStatus.CREATED);
    }

    @PatchMapping("{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") @Positive long id,

                                      @RequestBody MemberDto.Patch memberPatch){

        memberPatch.setId(id);

        Member member = mapper.MemberPatchToMember(memberPatch);
        Member updateMember = memberService.updateMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(updateMember)),HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long id) {
        Member member = memberService.findMember(id);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(member))
                , HttpStatus.OK);
    }


    @DeleteMapping("{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long id){
        memberService.deleteMember(id);
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

    /*@GetMapping("/me/logout")
    public ResponseEntity logout(HttpServletRequest request){
        memberService.logout(request);
        return new ResponseEntity("로그아웃 되었습니다", HttpStatus.OK);
    }*/


    //로그인 사용자가 작성한 질문 조회v1
    @GetMapping("/me/questionsTitle")
    public ResponseEntity<List<QuestionResponseDto>> getMyQuestionsTitle() {
       Long id = Long.parseLong((String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        return ResponseEntity.ok(memberService.getMyQuestionsTitle(id));
    }

    /*//로그인 사용자가 작성한 질문 조회 v2
    @GetMapping("/me/questionsTitle")
    public ResponseEntity<List<QuestionResponseDto>> getMyQuestionsTitle() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        UserDetails userDetails = (UserDetails)principal;
        String username = userDetails.getUsername();
        String password = userDetails.getPassword();

        memberService.validate(username,password);
        return ResponseEntity.ok();
    }
*/



   /* @GetMapping("/me/questions")
    public ResponseEntity<List<QuestionDto.MemberQuestionResponse>> getMyQuestions() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.getMyQuestionsTitle(id));
    }*/

}
