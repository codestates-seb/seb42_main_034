package com.project.tripAdvisor.auth;

import com.project.tripAdvisor.auth.filter.JwtAuthenticationFilter;
import com.project.tripAdvisor.auth.filter.JwtVerificationFilter;
import com.project.tripAdvisor.auth.handler.MemberAccessDeniedHandler;
import com.project.tripAdvisor.auth.handler.MemberAuthenticationEntryPoint;
import com.project.tripAdvisor.auth.handler.MemberAuthenticationFailureHandler;
import com.project.tripAdvisor.auth.handler.MemberAuthenticationSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnWebApplication;
import org.springframework.boot.autoconfigure.security.ConditionalOnDefaultWebSecurity;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

import java.util.Arrays;

@Configuration(proxyBeanMethods = false)
@EnableWebSecurity
@ConditionalOnDefaultWebSecurity
@ConditionalOnWebApplication(type = ConditionalOnWebApplication.Type.SERVLET)
public class SecurityConfiguration{//여기에 지원하는 인증과 권한부여설정을 하면된다.

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;


    public SecurityConfiguration(JwtTokenizer jwtTokenizer,
                                 CustomAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;

    }


    @Bean
    @Order(SecurityProperties.BASIC_AUTH_ORDER)
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //SecurityFilterChain을 Bean으로 등록해서 HTTP보안설정을 구성한다.

        http
                //.headers().frameOptions().sameOrigin()
                //.and()
                .csrf().disable()
                //기본적으로 아무설정을 하지 않으면 csrf 공격을 받음 클라이언트로부터 CSRF 토큰을 수신 후 검증
                .cors()
                .and()
                //세션을사용하지 않도록 설정함
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(autorize -> autorize
                                .antMatchers(HttpMethod.PATCH, "/members/**").hasRole("USER")
                                .antMatchers(HttpMethod.GET, "/members").hasRole("ADMIN")
                                .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("USER", "ADMIN")
                                .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER")
                                .anyRequest().permitAll()//JWT 적용전 우선 허용
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
//        configuration.addAllowedOriginPattern("*");
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("*"));//모든 출처에 대한 허용
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE"));//해당 메서드허용
//         configuration.addAllowedHeader("*");
//         configuration.addExposedHeader("*");
//        configuration.setAllowedHeaders(Arrays.asList("*"));
//        configuration.setExposedHeaders(Arrays.asList("Authorization", "Refresh"));

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
            jwtAuthenticationFilter.setFilterProcessesUrl("/trip/login");
            //객체 생성시 new 를 사용한이유는 이 핸들러의 경우 다른곳에서 사용이안되고 오직 여기서만 사용되기 때문임
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            //인스턴스를 생성하면서 해당 필터에서 사용되는 객체들을  DI 받는다.
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            //addFilter 를 통해 jwtAuthenticationFilter를 Spring Security Filter Chain에 추가한다.
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
//                    .addFilterAfter(jwtVerificationFilter, LoginUserFilter.class);

        }
    }
}