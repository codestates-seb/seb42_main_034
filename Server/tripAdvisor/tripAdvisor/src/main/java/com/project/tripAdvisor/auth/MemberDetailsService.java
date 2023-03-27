package com.project.tripAdvisor.auth;

import com.project.tripAdvisor.auth.util.CustomAuthorityUtils;
import com.project.tripAdvisor.exception.BusinessLogicException;
import com.project.tripAdvisor.exception.ExceptionCode;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

@Component
public class MemberDetailsService implements UserDetailsService { //커스텀 서비스 생성
    //DB에서 사용자의 크리덴셜을 조회 후 조회한 크리덴셜을 AuthenticationManager에 전달하는 로직 구현

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));


        return new MemberDetails(findMember);
    }

    private final class MemberDetails extends Member implements UserDetails{
        //데이터 베이스에서 조회한 회원정보를 Spring Security의 User 정보로 변환하는 과정과
        //User의 권한 정보를 생성하는 과정을 캡슐화 할 수 있다.
        MemberDetails(Member member){
            setId(member.getId());
            setNickname(member.getNickname());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }
        @Override
        //유저의 권한 정보 생성
        public Collection<? extends GrantedAuthority> getAuthorities(){
            //DB에 저장된 Role 정보로  User 권한 목록 생성
            return authorityUtils.createAuthorities(this.getRoles());
        }
        //스프링 시큐리티 에서 인식할 수 있는 username을 Member클래스의 email 주소로 채우고있다.
        @Override
        public String getUsername(){
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
