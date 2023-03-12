package com.project.tripAdvisor.member;


import com.project.tripAdvisor.response.SingleResponseDto;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@Validated
@RestController
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

    @DeleteMapping("{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") @Positive long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity(HttpStatus.OK);
    }

    //@GetMapping("{/questions/member-id}")
    //보안쪽 좀더해서 변경

}
