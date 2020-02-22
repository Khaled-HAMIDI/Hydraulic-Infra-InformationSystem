package dz.ade.pfe.web.security.config;

import dz.ade.pfe.admin.security.user.UserComponent;
import dz.ade.pfe.web.commons.apierrors.CustomAccessDeniedHandler;
import dz.ade.pfe.web.security.auth.RestAuthenticationEntryPoint;
import dz.ade.pfe.web.security.auth.TokenAuthenticationFilter;
import dz.ade.pfe.web.security.auth.TokenHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserComponent userComponent;
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;
    private TokenHelper tokenHelper;

    public WebSecurityConfig(UserComponent userComponent,
                             RestAuthenticationEntryPoint restAuthenticationEntryPoint,
                             TokenHelper tokenHelper) {
        super();
        this.userComponent = userComponent;
        this.restAuthenticationEntryPoint = restAuthenticationEntryPoint;
        this.tokenHelper = tokenHelper;
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_INHERITABLETHREADLOCAL);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService((UserDetailsService) userComponent).passwordEncoder(passwordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()
                .antMatchers(
                        HttpMethod.GET,
                        "/",
                        "/app/**",
                        "/assets/**",
                        "/webjars/**",
                        "/favicon.ico",
                        "/**/*.html",
                        "/**/*.css",
                        "/**/*.js"
                ).permitAll()
                .antMatchers(
                        "/api/auth/login",
                        "/api/auth/refresh-token",
                        "/socket/**",
                        "/v2/api-docs",
                        "/swagger-resources/**",
                        "/swagger-ui.html**",
                        "/actuator/**",
                        "/api/print/**",
                        "/api/uploads/**"
                )
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .exceptionHandling().authenticationEntryPoint(restAuthenticationEntryPoint).accessDeniedHandler(new CustomAccessDeniedHandler())
                .and()
                .addFilterBefore(new TokenAuthenticationFilter(tokenHelper, (UserDetailsService) userComponent),
                        BasicAuthenticationFilter.class);
    }
}
