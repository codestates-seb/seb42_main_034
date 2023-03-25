/*
package com.project.tripAdvisor.auth.filter;

import com.project.tripAdvisor.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class LoginUserFilter extends OncePerRequestFilter {

    private final MemberRepository memberRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberRepository.findByEmail(email).ifPresent(m-> request.setAttribute("memberId", m.getId()));

    }
}
*/
