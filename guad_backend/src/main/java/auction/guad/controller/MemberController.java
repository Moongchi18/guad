package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.service.MemberServiceImpl;

@RestController
public class MemberController {
	
	@Autowired
	MemberServiceImpl memberServiceImpl;
	public MemberController(MemberServiceImpl memberServiceImpl) {
		this.memberServiceImpl = memberServiceImpl;
	}
	
	@GetMapping("/test")
	public String test() {
		return "성공-!!_-!";
	}
	
}
