package com.project.tripAdvisor.member;

import com.project.tripAdvisor.blog.entity.Blog;
import com.project.tripAdvisor.member.sevice.MemberFindService;
import com.project.tripAdvisor.member.sevice.MemberService;
import com.project.tripAdvisor.question.entity.Question;
import com.project.tripAdvisor.response.MultiResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.security.Principal;
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

    private final HttpServletRequest request;

    private final MemberFindService memberFindService;


    public MemberController(MemberService memberService, MemberMapper mapper,
                            MemberRepository memberRepository,
                            HttpServletRequest request,
                            MemberFindService memberFindService) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
        this.request = request;
        this.memberFindService = memberFindService;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost){
        Member member = mapper.MemberPostToMember(memberPost); //MemberDto ---> 이제 우리는 Member로 로직처리

        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(createMember)), HttpStatus.CREATED);
    }

    @PatchMapping
    public ResponseEntity patchMember(Principal principal,
                                      @RequestBody MemberDto.Patch memberPatch){

        Member member = mapper.MemberPatchToMember(memberPatch);
        Member updateMember = memberFindService.updateMember(member, principal.getName());
        /*Member updateMember = memberService.updateMember(member);*/

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


    @DeleteMapping
    public ResponseEntity deleteMember(Principal principal){
        memberFindService.deleteMember(principal.getName());
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


    /*//로그인 사용자가 작성한 질문 조회v1
    @GetMapping("/me/questionsTitle")
    public ResponseEntity<List<QuestionResponseDto>> getMyQuestionsTitle() {
        Long id = (Long) request.getAttribute("memberId");
//       Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.getMyQuestionsTitle(id));
    }*/

   /* @GetMapping("/me/questions")
    public ResponseEntity<List<QuestionDto.MemberQuestionResponse>> getMyQuestions() {
        Long id = (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(memberService.getMyQuestionsTitle(id));
    }*/

    /*@GetMapping("/me/questionsTitle")
    public ResponseEntity getMyQuestionsTitle(@AuthenticationPrincipal Member member,
                                              @Positive @RequestParam int page,
                                              @Positive @RequestParam int size) {
        Page<Question> questionPage
                = memberFindService.findMyQuestions(member, page - 1, size);
        List<Question> questions =  questionPage.getContent();
        List<MemberDto.MemberQuestionResponse> response = mapper.QuestionsToMemberQuestionsResponseDtos(questions);
        return new ResponseEntity<>(
                new MultiResponseDto<>(response, questionPage), HttpStatus.OK);
    }
*/
    @GetMapping("/me/questionsTitle")
    public ResponseEntity getMyQuestionsTitle (Principal principal,
                                               @Positive @RequestParam int page,
                                               @Positive @RequestParam int size) {
        Page<Question> questionPage
                = memberFindService.findMyQuestions(principal.getName(), page, size);
        List<Question> questions =  questionPage.getContent();
        List<MemberDto.MemberQuestionResponse> response = mapper.QuestionsToMemberQuestionsResponseDtos(questions);

        return new ResponseEntity<>(
                new MultiResponseDto<>(response, questionPage), HttpStatus.OK);
    }

    @GetMapping("/me/blogsTitle")
    public ResponseEntity getMyBlogsTitle (Principal principal,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size) {
        Page<Blog> blogPage
                = memberFindService.findMyBlogs(principal.getName(), page, size);
        List<Blog> blogs = blogPage.getContent();
        List<MemberDto.MemberBlogResponse> responses = mapper.BlogsToMemberBlogsResponseDtos(blogs);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responses, blogPage), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity findMe(Principal principal){
        Member member = memberFindService.findMyProfile(principal.getName());

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberInfoDto(member)), HttpStatus.OK);
    }
}