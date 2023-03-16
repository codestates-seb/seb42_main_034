package com.project.tripAdvisor.member;


import com.project.tripAdvisor.response.MultiResponseDto;
import com.project.tripAdvisor.response.SingleResponseDto;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Validated
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post memberPost){
        Member member = mapper.MemberPostToMember(memberPost); //MemberDto ---> 이제 우리는 Member로 로직처리

        Member createMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.MemberToMemberResponseDto(createMember)), HttpStatus.CREATED);
    }

    @PatchMapping("{member-id}")
    public ResponseEntity patchMember(@PathVariable("question-id") @Positive long memberId,
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

    /*@GetMapping("{/blogs}")//블로그 조회
    public ResponseEntity getMembers(@PathVariable("/blogs") @Positive long blogId,
                                    @Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Member> pageMembers = memberService.getBlogs(page -1, size);
        List<Member> members = pageMembers.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(
                        mapper.MembersToMemberResponseDto(members), pageMembers), HttpStatus.OK);
    }*/


}
