package auction.guad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.security.PrincipalDetails;
import auction.guad.service.MemberService;
import auction.guad.vo.RequestVo;
import io.swagger.annotations.ApiOperation;

@RestController
public class MemberController {

	MemberService memberService;
	BCryptPasswordEncoder encoder;

	@Autowired
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

	// 회원가입
	@ApiOperation(value = "회원가입(MemberDto)", notes = "회원가입, 파라미터 : MemberDto")
	@PostMapping("/member")
	public ResponseEntity<String> insertMember(@RequestBody MemberDto member) throws Exception {
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<" + member);
		int memberNum = memberService.insertMember(member);
		System.out.println("memberNum>>>>>>>>>"+memberNum);
		if (memberNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}

	// 로그인 토큰으로 회원정보 조회
	@ApiOperation(value = "회원정보 조회()", notes = "회원정보 조회, 파라미터 : ''")
	@GetMapping("/member")
	public ResponseEntity<MemberDto> myPageByEmail(@AuthenticationPrincipal User user) throws Exception {
		System.out.println(">>>>>>>>>>>>>>>" + user);
		MemberDto memberDto = memberService.selectMemberDetailByEmail(user.getUsername());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}

	// email, pass로 회원정보 조회
	@ApiOperation(value = "회원정보 조회(email, pass)", notes = "회원정보 조회, 파라미터 : email, pass")
	@PostMapping("/member/pw")
	public ResponseEntity<MemberDto> myPageByEmailAndPass(@RequestBody RequestVo request) throws Exception {
		MemberDto memberDto = memberService.selectMemberDetailByEmail(request.getEmail());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else if (request.getPass() != memberDto.getPass()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}

	// 회원정보 수정
	@ApiOperation(value = "회원정보 수정(MemberDto)", notes = "회원정보 수정, 파라미터 : MemberDto")
	@PostMapping("/member/update")
	public ResponseEntity<String> updateMember(@RequestBody MemberDto member, @AuthenticationPrincipal User user)
			throws Exception {
		
		if (memberService.selectMemberDetailByEmail(user.getUsername()) == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.updateMemberByEmail(member);
		return ResponseEntity.ok("회원정보 수정에 성공했습니다");
	}

	// 회원 탈퇴(flag)
	@ApiOperation(value = "회원탈퇴-flag(email)", notes = "회원탈퇴-flag, 파라미터 : email")
	@PostMapping("/member/delete")
	public ResponseEntity<String> deleteMember(@RequestBody RequestVo request) throws Exception {
		MemberDto member = memberService.selectMemberDetailByEmail(request.getEmail());
		if (member == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.deleteMemberByEmail(member);
		return ResponseEntity.ok("회원 탈퇴에 성공했습니다");

	}

	// 관리자용 회원 목록 조회
	@ApiOperation(value = "관리자용 회원 목록 조회()", notes = "관리자용 회원 목록 조회, 파라미터 : ''")
	@GetMapping("/admin/member")
	public List<MemberDto> adminMemberList(@AuthenticationPrincipal User user) throws Exception {
		System.out.println("/admin/member 호출 >>>>>>>>>>>>>>>>>>" + user);
		return memberService.managerSelectMemberListExceptPass();
	}

	// 관리자용 탈퇴 회원 목록 조회
	@ApiOperation(value = "관리자용 탈퇴회원-flage 조회()", notes = "관리자용 탈퇴회원 조회, 파라미터 : ''")
	@RequestMapping(value = "/admin/member/delete", method = RequestMethod.GET)
	@GetMapping("/admin/member/delete")
	public List<MemberDto> admindeleteMemberList() throws Exception {
		return memberService.managerSelectMemberListExceptPassAnddelete();
	}

	// 관리자용 회원 상세 조회
	@ApiOperation(value = "관리자용 회원 상세 조회(email)", notes = "관리자용 회원 상세 조회, 파라미터 : email")
	@GetMapping("/admin/member/{email}")
	public MemberDto admindeleteMemberList(@PathVariable String email) throws Exception {
		return memberService.managerSelectMemberDetailByEmail(email);
	}

	// 이메일 중복 체크
	@ApiOperation(value = "회원가입 - id중복체크(email)", notes = "회원가입 - id중복체크, 파라미터 : email")
	@PostMapping(value="/member/idcheck")
	public ResponseEntity<Integer> repetitionEmailCheck(@RequestBody MemberDto member) throws Exception {
		Integer result = memberService.repetitionEmailCheck(member.getEmail());
		System.out.println("<<<<<<<<<<<<<<<<호출");
		System.out.println(result);
		if (result == 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else if (result == 0) {
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
		}
	}

	// 닉네임 중복 체크
	@ApiOperation(value = "회원가입 - nickname중복체크(nickname)", notes = "회원가입 - nickname중복체크, 파라미터 : nickname")
	@PostMapping(value = "/member/nicknamecheck")
	public ResponseEntity<Integer> repetitionNicknameCheck(@RequestBody MemberDto member) throws Exception {
		Integer result1 = memberService.repetitionNicknameCheck(member.getNickname());
		if (result1 == 1) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
		} else if (result1 == 0) {
			return ResponseEntity.status(HttpStatus.OK).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(null);
		}

	}

	@PostMapping("/mypage/passcheck")
	public ResponseEntity<Boolean> passCheck(@AuthenticationPrincipal User user, @RequestBody MemberDto member)
			throws Exception {

		String pass = member.getPass();
		String userPass = user.getPassword();

		boolean result = memberService.checkPass(user, member);
		if (result) {
			return ResponseEntity.status(HttpStatus.OK).body(true);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
		}
	}
	
}
