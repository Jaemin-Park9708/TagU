package com.ssafy.project.config;

import com.ssafy.project.attribute.OAuth2SuccessHandler;
import com.ssafy.project.service.CustomOAuth2UserService;
import com.ssafy.project.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;
    private final TokenService tokenService;
    private final CorsConfig corsConfig;
    private final ExceptionHandlerFilter exceptionHandlerFilter;

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic(HttpBasicConfigurer::disable)
                .csrf(CsrfConfigurer::disable)
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests((authorizeRequests) ->
                        authorizeRequests
//                                .requestMatchers("/swagger-resources/**").permitAll()
//                                .requestMatchers("/swagger-ui/**").permitAll() // 스웨거 경로 허용
                                .requestMatchers("/ws/**").permitAll()
//                                .requestMatchers("/users/setUserStatus").permitAll()
                                .anyRequest().authenticated()
                )
                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class) // CorsConfig를 먼저 실행하도록 변경
                .addFilterBefore(new JwtAuthFilter(tokenService), CorsFilter.class) // JwtAuthFilter를 CorsFilter 뒤로 이동
                .addFilterBefore(exceptionHandlerFilter, JwtAuthFilter.class)
                .oauth2Login(oauth2Login ->
                                oauth2Login
                                        .successHandler(successHandler)
                                        .userInfoEndpoint(userInfoEndpointConfig
                                                -> userInfoEndpointConfig.userService(oAuth2UserService))
                );

//        http.httpBasic().disable()
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests()
//                .requestMatchers("/api/token/**").permitAll()
//                .requestMatchers("/api/login/oauth2/kakao").permitAll()
//                .anyRequest().authenticated()
//                .and()
//                ////
//                .addFilter(corsConfig.corsFilter())
//                ////
//                .addFilterBefore(new JwtAuthFilter(tokenService),
//                        UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(exceptionHandlerFilter, JwtAuthFilter.class)
//                .oauth2Login().loginPage("http://localhost:3000/home") // loginPage("http://localhost:3000/auth")
//                .successHandler(successHandler)
//                .userInfoEndpoint().userService(oAuth2UserService);
//        http.addFilterBefore(new JwtAuthFilter(tokenService), UsernamePasswordAuthenticationFilter.class);

//        http
//                .httpBasic().disable()
//                .csrf().disable()
//                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//                .and()
//                .authorizeRequests(authorizeRequests ->
//                        authorizeRequests
////                                .requestMatchers("/api/token/**", "/api/login/oauth2/kakao").permitAll()
//                                .requestMatchers("/swagger-resources/**").permitAll()
//                                .requestMatchers("/swagger-ui/**").permitAll() // 스웨거 경로 허용
//                                .requestMatchers("/ws/**").permitAll()
//                                .anyRequest().authenticated()
//                )
//                .addFilterBefore(corsConfig.corsFilter(), UsernamePasswordAuthenticationFilter.class) // CorsConfig를 먼저 실행하도록 변경
//                .addFilterBefore(new JwtAuthFilter(tokenService), CorsFilter.class) // JwtAuthFilter를 CorsFilter 뒤로 이동
//                .addFilterBefore(exceptionHandlerFilter, JwtAuthFilter.class)
//                .oauth2Login(oauth2Login ->
//                        oauth2Login
////                                .loginPage("http://localhost:3000/home")
//                                .successHandler(successHandler)
//                                .userInfoEndpoint().userService(oAuth2UserService)
//                );

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){
        return web -> {
            web.ignoring()
                    .requestMatchers(
                            "/swagger-ui/**",
                            "v1/**",
                            "/v2/api-docs",  "/configuration/ui",
                            "/swagger-resources/**", "/configuration/security",
                            "/swagger-ui.html", "/webjars/**","/swagger/**"
                    );
        };
    }
}