package com.project.tripAdvisor.auth.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthorityUtils {
    @Value("${mail.address.admin}")
    private String adminMailAddress;

    //어드민 정의
    private final List<GrantedAuthority> ADMIN_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_ADMIN", "RULE_USER");
    //유저 정의
    private final List<GrantedAuthority> USER_ROLES =
            AuthorityUtils.createAuthorityList("ROLE_USER");
    //관리자 role 목록
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    //사용자 role 목록
    private final List<String> USER_ROLES_STRING = List.of("USER");

    //DB에 저장된 Role을기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(List<String> roles){
        List<GrantedAuthority> authorities = roles.stream()
                //권한지정 규칙임
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return authorities;
    }

    //DB 저장용
    public List<String > createRoles(String email){
        if(email.equals(adminMailAddress)){
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
