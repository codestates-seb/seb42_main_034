package com.project.tripAdvisor.auth.filter;

import com.project.tripAdvisor.auth.CustomAuthorityUtils;
import com.project.tripAdvisor.auth.JwtTokenizer;
import com.project.tripAdvisor.member.Member;
import com.project.tripAdvisor.member.MemberRepository;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.security.SignatureException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.http.HttpClient;
import java.util.List;
import java.util.Map;
import java.util.Optional;

//클라이언트 측에서 JWT를 이용해 자격증명이 필요한 리소스에 대해 request전송 시 헤더를 통해 전달받은 JWT를 서버측에서 검증
public class JwtVerificationFilter extends OncePerRequestFilter {//request당 한번만 실행되는 시큐리티 필터구현가능
    //JWT를 검증하고, Claims(토큰에 포함된 정보)를 얻는데 사용
    private final JwtTokenizer jwtTokenizer;
    //Authentication 객체에 채울 사용자 권한을 생성하는데 이용
    private final CustomAuthorityUtils authorityUtils;



    @Autowired
    private MemberRepository memberRepository;


    public JwtVerificationFilter(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                 FilterChain filterChain) throws ServletException, IOException {
        try {
            Map<String, Object> claims = verifyJws(request);//서버에서 전송한 JWT를 request 헤터에서 얻음
            setAuthenticationToContext(claims);//Authentication 객체를 SecurityContext에 저장하기 위한 메서드
        } catch (SignatureException se){
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee){
            request.setAttribute("exception", ee);
        } catch (Exception e){
            request.setAttribute("exception", e);
        }

        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        memberRepository.findByEmail(email).ifPresent(m-> request.setAttribute("memberId", m.getId()));

        //위 과정이 성공적으로 수행되면 다음 security filter를 호출한다.
        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        String authorization = request.getHeader("Authorization"); //Authorization 값을 헤더 로 얻은 후

        return authorization == null || !authorization.startsWith("Bearer"); //Authorization 헤더 값이 null이거나 Bearer로 시작하지 않는다면 동작을 수행하지 않도록 정의함
    }

    private Map<String, Object> verifyJws(HttpServletRequest request){
        //replace 메서드를 이용해 Bearer 제거
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        //서명검증을 위한 key를 얻음
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        //claims를 파싱함 ->정상적으로 파싱이되면 성공했다고 생각함
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims){
        String username = (String) claims.get("username"); //파싱한 clain에서 username을 얻음
        //얻은 권한정보로 List<GrantedAuthority> 생성
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List)claims.get("roles"));
        //Authentication객체 생성(name과 role 포함)
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        //securityContext에 Authentication객체 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}
