package com.project.tripAdvisor.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.hibernate.tuple.InDatabaseValueGenerationStrategy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

/*//로그인 인증에 성공한 클라이언트에게 JWT를 생성 및 발급, 클라이언트 요청이 들어올때마다 전달된 JWT 검증함*/
@Component
public class JwtTokenizer {//JWT 생성기능 구현

    //application.yml 에서 로드
    //JWT 생성 및 검증 시 사용 되는 Secret Key 정보
    @Getter
    @Value("${jwt.key}")
    private String secretKey;

    // Access Token에 대한 만료시간 정보
    @Getter
    @Value("${jwt.access-token-expiration-minutes}")
    private int accessTokenExpirationMinutes;

    // Refresh Token에 대한 만료시간 정보
    @Getter
    @Value("${jwt.refresh-token-expiration-minutes}")
    private int refreshTokenExpirationMinutes;

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //Plain Text 형태인 Secret Key의 byte[]를 Base64 형식의 문자열로 인코딩해준다.
    public String encodeBase64SecretKey(String secretKey){
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    public String generateAccessToken(Map<String, Object> claims,
                                      String subject,
                                      Date expiration,
                                      String base64EncodedSecretKey){
        //Base64 형식 Secret Key 문자열을 이용해 Key 객체를 얻는다.
        Key key =getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setClaims(claims) //custom claims를 추가함, 주로 인증된 사용자와 관련된 정보
                .setSubject(subject) //JWT에 대한 제목
                .setIssuedAt(Calendar.getInstance().getTime())//토큰 발행일자 설정
                .setExpiration(expiration) //만료일시 지정
                .signWith(key) //서명을 위한 key객체 설정
                .compact(); //JWT생성 후 직렬화
    }

    //Access Token 만료 시 새로 생성할 수 있는 Refresh Token 생성메서드
    public String generateRefreshToken(String subject, Date expiration,
                                       String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
    //JWT의 서명에 사용할 Secret Key를 생성
    private Key getKeyFromBase64EncodedKey(String base64EncodedSecretKey){
        //Base64 형식으로 인코딩된 Secret Key를 디코딩한 후, byte array를 반환함
        byte[] keyBytes = Decoders.BASE64.decode(base64EncodedSecretKey);
        //적절한 HMAC 알고리즘을 적용한 Key객체 생성
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }


    //JWT 검증 기능 구현
    //JWT를 생성할 때 서명에 사용된 Secret Key를 이용해 내부적으로 Signature 검증 후 파싱
    //jws는 Signature가 포함된 JWT임
    public void verifySignature(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)//서명에 사용된 Secret Key 설정
                .build()
                .parseClaimsJwt(jws);//JWT를 파싱하여 claims를 얻는다.
    }

    public Jws<Claims> getClaims(String jws, String base64EncodedSecretKey){
        Key key = getKeyFromBase64EncodedKey(base64EncodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    //만료 일시를 지정하기 위한 메서드 JWT 생성 시 이용
    public Date getTokenExpiration(int expirationMinutes){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationMinutes);
        Date expiration = calendar.getTime();

        return expiration;
    }
}
