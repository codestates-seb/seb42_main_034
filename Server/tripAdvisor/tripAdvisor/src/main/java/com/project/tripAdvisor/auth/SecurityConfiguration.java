package com.project.tripAdvisor.auth;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {//여기에 지원하는 인증과 권한부여설정을 하면된다.

    private final JwtTokenizer jwtTokenizer;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer) {
        this.jwtTokenizer = jwtTokenizer;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //SecurityFilterChain을 Bean으로 등록해서 HTTP보안설정을 구성한다.
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                //기본적으로 아무설정을 하지 않으면 csrf 공격을 받음 클라이언트로부터 CSRF 토큰을 수신 후 검증
                .cors().disable()//corsConfigurationSource이름의 bean을 이용함
                .formLogin().disable()
                //기본적인 인증 방법 설정 폼로그인
                .httpBasic().disable()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(autorize -> autorize
                                .anyRequest().permitAll()//JWT 적용전 우선 허용
                    /*.antMatchers("/orders/**").hasRole("ADMIN")
                    //admin 룰을 부여받은 사용자만 /orders 로 시작하는 모든 URL에 접근가능
                    .antMatchers("/members/my-page").hasRole("USER")
                    .antMatchers("/**").permitAll()
                    //앞에서 말한 URL 외에 모든 것은 접근가능함.*/
                );//사용자의 Role별로 request URI에 접근권한 부여
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
//구체적인 CORS 정책을 설정한다.
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); //모든 출처에 대한 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));//해당 메서드허용

        //CorsConfigurationSource 인터페이스의 구현클래스임
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //앞에서 구현한 CORS 정책 적용
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    //인증처리 로직 우리가 구현한 JwtAuthenticationFilter 등록
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{
            //AuthenticationManager객체 얻기, 공유되는 객체
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            //
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager,
                    jwtTokenizer);
            //default URL인 /login 을 해당 URL로 변경한다.
            jwtAuthenticationFilter.setFilterProcessesUrl("/v11/auth/login");
            //addFilter 를 통해 jwtAuthenticationFilter를 Spring Security Filter Chain에 추가한다.
            builder.addFilter(jwtAuthenticationFilter);
        }
    }
}