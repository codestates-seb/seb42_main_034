package com.project.tripAdvisor.member.service;


import com.project.tripAdvisor.auth.util.CustomAuthorityUtils;
import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberRepository;
import com.project.tripAdvisor.question.repository.QuestionRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final ApplicationEventPublisher publisher;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final QuestionRepository questionRepository;

    private final HttpServletRequest request;

    private static final String HEADER_PREFIX = "Bearer";

    public MemberService(MemberRepository memberRepository,
                         ApplicationEventPublisher publisher,
                         PasswordEncoder passwordEncoder,
                         CustomAuthorityUtils authorityUtils,
                         QuestionRepository questionRepository,
                         HttpServletRequest request
                         ) {
        this.memberRepository = memberRepository;
        this.publisher = publisher;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.questionRepository = questionRepository;
        this.request = request;
    }

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원가입 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @Transactional
    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail()); //이미등록된 이메일인 지 확인
        //보안추가예정
        //password 암호화 (단방향)
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        //Db에 User의 권한정보(Role) 저장, 등록하는 사용자의 권한 정보 생성
        //authorityUtils를 통해 생성한 role을 멤버로 넘겨주고 있다.
        //authorityUtils에있는 createRoles 메서드가 필요하다
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        member.setCreatedAt(LocalDateTime.now());
        Member createMember = memberRepository.save(member);

        return createMember;
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원정보 수정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @Transactional
    public Member updateMember(Member member, String email){

        Member foundMember = findMemberByEmail(email);
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> foundMember.setNickname(nickname));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> foundMember.setPassword(password));
        Optional.ofNullable(member.getLocation())
                .ifPresent(location -> foundMember.setLocation(location));
        Optional.ofNullable(member.getMemberStatus())
                .ifPresent(memberStatus -> foundMember.setMemberStatus(memberStatus));

        foundMember.setModifiedAt(LocalDateTime.now());
        Member updateMember = memberRepository.save(foundMember);
        return updateMember;
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원조회ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @Transactional
    public Member findMember(long id) {
        return findVerifiedMember(id);
    }

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원정보 삭제ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    @Transactional
    public void deleteMember(Member member){
        member.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);//탈퇴한 회원의 상태를 변경하여 탈퇴 회원관리
        memberRepository.save(member);
//      memberRepository.deleteById(memberId); 로 해도되긴하는데 회원정보가 아예 삭제됨.
    }

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ로그아웃ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    /*public void logout(HttpServletRequest request){
        //access token 블랙리스트에 넣기
        String accessToken = request.getHeader("Authorization");
        String accessTokenContent = accessToken.substring(HEADER_PREFIX.length();
    }*/

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ기타 메서드ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    public Member findVerifiedMember(long id){
        Optional<Member> optionalMember = memberRepository.findById(id);
        Member foundMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_EXISTS));
        return foundMember;
    }

    private void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);
        if(member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    public Member findMemberByEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        Member foundMember = optionalMember.orElseThrow(()->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_EXISTS));
        return foundMember;
    }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ내가 작성한 게시글 불러오기 title 만ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    /*public List<QuestionResponseDto> getMyQuestionsTitle(Long id) {
        List<QuestionResponseDto> QuestionDtoList = new ArrayList<>();
        List<Question> questionList = questionRepository.findAllByMemberId(id);

        for (Question question : questionList) {
            QuestionDtoList.add(
                    QuestionResponseDto.builder()
                            .title(question.getTitle())
                            .build());
        }
        return QuestionDtoList;
    }*/
    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ내가 작성한 게시글 불러오기
    /*public List<QuestionDto.MemberQuestionResponse> getMyQuestions(Long id) {
        List<QuestionDto.MemberQuestionResponse> QuestionDtoList = new ArrayList<>();
        List<Question> questionList = questionRepository.findAllByMemberId(id);

        for (Question question : questionList) {
            QuestionDtoList.add(
                    QuestionDto.MemberQuestionResponse.builder()
                            .title(question.getTitle())
                            .content(question.getContent())
                            .build());
        }
        return QuestionDtoList;
    }*/

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ회원정보 검증
    public Member validate(String email, String password) throws RuntimeException {
        return memberRepository.findByEmail(email)
                .filter(member -> passwordEncoder.matches(password, member.getPassword()))
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

}
