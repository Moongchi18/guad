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


@Configuration
@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

	// 의존 객체를 생성자를 통해서 주입 
//	private JpaMemberService memberService;
	private BCryptPasswordEncoder passwordEncoder;
//	private JwtTokenUtil jwtTokenUtil;
//	private JwtRequestFilter jwtRequestFilter;
	
//	public WebSecurity(JpaMemberService memberService, BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil,
//	public WebSecurity(BCryptPasswordEncoder passwordEncoder, JwtTokenUtil jwtTokenUtil,
//			JwtRequestFilter jwtRequestFilter) {
//		this.memberService = memberService;
//		this.passwordEncoder = passwordEncoder;
//		this.jwtTokenUtil = jwtTokenUtil;
//		this.jwtRequestFilter = jwtRequestFilter;
//	}

	// 접근 권한과 관련한 설정
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.authorizeRequests()
			.antMatchers("/admin/**").hasRole("y")
			.anyRequest().permitAll();
		
		// http.authorizeRequests().antMatchers("/**").permitAll();
		
//		http.authorizeRequests()
//			.antMatchers("/api/jpa/member/**").authenticated()
//			.and().addFilter(getAuthenticationFilter()); 
		
		// 로그인 외의 모든 경로에 인증 요구
		// 필터적용 순서 : jwtRequestFIlter -> AuthenticationFilter
//		http.authorizeRequests()
//			.antMatchers("/login").permitAll()
//			.anyRequest().authenticated()
//			.and().addFilter(getAuthenticationFilter())
//			.addFilterBefore(jwtRequestFilter, AuthenticationFilter.class)
//			.cors();
	}													 				
	
//	private AuthenticationFilter getAuthenticationFilter() throws Exception {
////		AuthenticationFilter authenticationFilter = new AuthenticationFilter(memberService, jwtTokenUtil);
//		AuthenticationFilter authenticationFilter = new AuthenticationFilter(jwtTokenUtil);
//		authenticationFilter.setAuthenticationManager(authenticationManager());
//		return authenticationFilter;
//	}
	
	// 인증 처리에 필요한 설정
	// 사용자 정보를 조회할 서비스와 패스워드 암호화에 사용할 방식을 지정 
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
//		auth.userDetailsService(memberService).passwordEncoder(passwordEncoder);
	}
	
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("**"));
		// CORS요청은 OPTIONS방식으로 이루어짐. OPTIONS메소드를 허용해야 CORS도 허용할 수 있음
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "token"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	
}
