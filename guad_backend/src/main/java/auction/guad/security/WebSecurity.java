package auction.guad.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import auction.guad.service.MemberService;

@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

	// 의존 객체를 생성자를 통해서 주입
	private MemberService memberService;
	private BCryptPasswordEncoder passwordEncoder;
	private JwtTokenUtil jwtTokenUtil;
	private JwtRequestFilter jwtRequestFilter;

	public WebSecurity(MemberService memberService, BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil,
			JwtRequestFilter jwtRequestFilter) {
		this.memberService = memberService;
		this.passwordEncoder = passwordEncoder;
		this.jwtTokenUtil = jwtTokenUtil;
		this.jwtRequestFilter = jwtRequestFilter;
	}

	// 접근 권한과 관련한 설정
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		// csrf차단기능 : get제외한 http메서드 차단
		// csrf차단 기능 해제 : jwt토큰을 사용하므로 csrf차단기능이 않음
		http.csrf().disable();
		http.authorizeRequests().antMatchers("/**/admin/**").hasRole("y").anyRequest().permitAll().and()
				.addFilter(getAuthenticationFilter()).addFilterBefore(jwtRequestFilter, AuthenticationFilter.class)
//			.oauth2Login()
//			.loginPage("/loginForm")
//			.and()
				.cors();

	}

	private AuthenticationFilter getAuthenticationFilter() throws Exception {
		AuthenticationFilter authenticationFilter = new AuthenticationFilter(memberService, jwtTokenUtil);
		authenticationFilter.setAuthenticationManager(authenticationManager());
		return authenticationFilter;
	}

	// 인증 처리에 필요한 설정
	// 사용자 정보를 조회할 서비스와 패스워드 암호화에 사용할 방식을 지정
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
	}
	
	//추후 S3 에서 가져올 모든 자료요청에 대해 시큐리티 작동 무시
	@Override
	public void configure(org.springframework.security.config.annotation.web.builders.WebSecurity web)
			throws Exception {
		web.ignoring().antMatchers("/resources/**", "/dist/**", "/css/**", "/font-awesome/**", "/fonts/**",
				"/image/**}");
	}

	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "token"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

}
