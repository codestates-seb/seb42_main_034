package com.project.tripAdvisor.auth.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.tripAdvisor.auth.util.JwtTokenizer;
import com.project.tripAdvisor.auth.dto.LoginDto;
import com.project.tripAdvisor.member.Member;
import lombok.SneakyThrows;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

//클라이언트의 로그인 인증 정보를 직접적으로 수신하여 인증 처리의 엔트리포인트 역할을 하는 filter
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    /*//UsernamePasswordAuthenticationFilter 는 폼 로그인 방식에서 사용하는 디폴트 filter지만,
    //폼 로그인이 아니더라도 Username/Password 기반의 인증을 처리하기위해 확장구현 사용가능!!*/
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;

    public JwtAuthenticationFilter(AuthenticationManager authenticationManager,
                                   JwtTokenizer jwtTokenizer) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenizer = jwtTokenizer;
    }

    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response){
        //클라이언트에서 전송한 정보를 DTO 클래스로 역직렬화 하기위한 인스턴스 생성
        ObjectMapper objectMapper = new ObjectMapper();
        //ServletInputStream을 LoginDto 클래스의 객체로 역직렬화
        LoginDto loginDto = objectMapper.readValue(request.getInputStream(), LoginDto.class);


        //Username과 Password 정보를 포함한 토큰 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());
        //토큰을 authenticationManager에 전달하면서 인증처리 위임
        return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        //authResult로 Member 엔티티 클래스의 객체를 획득
        //위에 있는 AuthenticationManager 내부에서 인증에 성공하면
        //인증된 Authentication 객체가 생성되면서 principal 필드에 Member 객체가 할당 됩니다.
        Member member = (Member) authResult.getPrincipal();

        //메서드를 이용한 토큰 생성
        String accessToken = delegateAccessToken(member);
        String refreshToken = delegateRefreshToken(member);

        //response header(Authorization)에 Access Token을 추가함
        //클라이언트에서 요청을 보낼때마다 request header에 추가해야함
        response.setHeader("Authorization", "Bearer" + accessToken);
        //Access 토큰이 만료될 경우 클라이언트 측이 추가로 발급받기위해 제공 될 수있다.
        //이것을 같이 제공할지는 요구사항에 따라 다름
        response.setHeader("Refresh", refreshToken);
        //로그인 구현 실패시 failure 메서드가 알아서 호출된다.
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }

    //ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ토큰 생성 구체적 로직ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    private String delegateAccessToken(Member member){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", member.getEmail());
        claims.put("roles", member.getRoles());

        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedSecretKey);

        return accessToken;
    }

    private String delegateRefreshToken(Member member){
        String subject = member.getEmail();
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }

}