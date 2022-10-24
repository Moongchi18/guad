package auction.guad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.service.MemberService;
import auction.guad.vo.RequestVo;
import auction.guad.vo.ResponseVo;

@RestController
public class MemberController {
	
	@Autowired
	MemberService memberService;
	public MemberController(MemberService memberService) {
		this.memberService = memberService;
	}

//	회원가입
	@RequestMapping(value = "/member", method = RequestMethod.POST)
	public ResponseEntity<String> insertMember(@RequestBody MemberDto member) throws Exception {
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<" +member);
		int memberNum = memberService.insertMember(member);
		if (memberNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}

	// email로 회원정보 조회
	@RequestMapping(value = "/member/id", method = RequestMethod.POST)
	public ResponseEntity<MemberDto> myPageByEmail(@RequestBody RequestVo request) throws Exception {
		MemberDto memberDto = memberService.selectMemberDetailByEmail(request.getEmail());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}
	
	// email, pass로 회원정보 조회
	@RequestMapping(value = "/member/pw", method = RequestMethod.POST)
	public ResponseEntity<MemberDto> myPageByEmailAndPass(@RequestBody RequestVo request) throws Exception {
		MemberDto memberDto = memberService.selectMemberDetailByEmail(request.getEmail());
		if (memberDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else if(request.getPass() != memberDto.getPass()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} else {
			return ResponseEntity.ok(memberDto);
		}
	}
	

	// 회원정보 수정
	@RequestMapping(value = "/member", method = RequestMethod.PATCH)
	public ResponseEntity<String> updateMember(@RequestBody MemberDto member) throws Exception {
		if(memberService.selectMemberDetailByEmail(member.getEmail())==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.updateMemberByEmail(member);
		return ResponseEntity.ok("회원정보 수정에 성공했습니다");
	}

	// 회원 탈퇴(flag)
	@RequestMapping(value = "/member/delete", method = RequestMethod.PATCH)
	public ResponseEntity<String> deleteMember(@RequestBody RequestVo request) throws Exception {
		MemberDto member = memberService.selectMemberDetailByEmail(request.getEmail());
		if(member==null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("입력하신 정보를 찾을 수 없습니다.");
		}
		memberService.deleteMemberByEmail(member);
		return ResponseEntity.ok("회원 탈퇴에 성공했습니다");

	}
	
	// 관리자용 회원 목록 조회
	@RequestMapping(value = "/admin/member", method = RequestMethod.GET)
	public List<MemberDto> adminMemberList() throws Exception {
		System.out.println("/admin/member 호출 >>>>>>>>>>>>>>>>>>");
		return memberService.managerSelectMemberListExceptPass();
	}
	
	// 관리자용 탈퇴 회원 목록 조회
	@RequestMapping(value = "/admin/member/deleted", method = RequestMethod.GET)
	public List<MemberDto> adminDeletedMemberList() throws Exception {
		return memberService.managerSelectMemberListExceptPassAndDeleted();
	}
	
	// 관리자용 회원 상세 조회
	@RequestMapping(value = "/admin/member/{email}", method = RequestMethod.GET)
	public MemberDto adminDeletedMemberList(@PathVariable String email) throws Exception {
		return memberService.managerSelectMemberDetailByEmail(email);
	}
}
