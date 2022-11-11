package auction.guad.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.security.PrincipalDetails;


@RestController
public class GoogleLoginController {

	@RequestMapping(value = "/google/auth", method = RequestMethod.POST)
	public ResponseEntity<String> googleAuth(@RequestBody MemberDto member) throws Exception {

		System.out.println("<<<<<<<<<<<<<<<<" + member);
		String googleId = member.getEmail();
		// 회원 조회서비스 추가 예정
		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + googleId);

		if (googleId != null) {
			return ResponseEntity.status(HttpStatus.OK).body("로그인 성공");
		} else {
			return ResponseEntity.status(300).body("로그인 실패");
		}
    }
	
	@GetMapping("/login/oauth2/code/google")
	public void test1() {
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡtest1ㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
	}
	
	@GetMapping("/oauth/loginInfo")
	public void test2(@AuthenticationPrincipal OAuth2User user) {
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡtest2ㅡㅡㅡㅡㅡㅡㅡㅡㅡ");
		System.out.println(user);
	}
}