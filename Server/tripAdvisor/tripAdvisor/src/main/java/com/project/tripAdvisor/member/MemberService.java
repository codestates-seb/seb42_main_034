package com.project.tripAdvisor.member;


import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());
        //보안추가예정

        Member createMember = memberRepository.save(member);
        return createMember;
    }

    public Member updateMember(Member member){
        Member foundMember = findVerifiedMember(member.getMemberId());
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> foundMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> foundMember.setPassword(password));
        Optional.ofNullable(member.getLocation())
                .ifPresent(location -> foundMember.setLocation(location));
        Member updateMember = memberRepository.save(foundMember);
        return updateMember;
    }

    /*public Page<Member> getBlog(List<String> blog, int page, int size){
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("createdAt").descending()));
    } //내가 쓴 블로그 Id 조회?*/

    public void deleteMember(long memberId){
        Member foundMember = findVerifiedMember(memberId);
        foundMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);//탈퇴한 회원의 상태를 변경하여 탈퇴 회원관리
        memberRepository.save(foundMember);
//      memberRepository.deleteById(memberId); 로 해도되긴하는데 회원정보가 아예 삭제됨.
    }

    public Member findVerifiedMember(long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member foundMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_EXISTS));
        return foundMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

}
