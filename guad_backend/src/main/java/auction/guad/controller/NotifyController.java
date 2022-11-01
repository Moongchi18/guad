package auction.guad.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.dto.NotifyDto;
import auction.guad.service.NotifyService;
import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/notify")
public class NotifyController {
	
	NotifyService notifyService;
	BCryptPasswordEncoder encoder;
	
	@Autowired
	public NotifyController(NotifyService notifyService) {
		this.notifyService = notifyService;
	}
	
	
	@ApiOperation(value = "신고등록(NotifyDto)", notes = "신고등록, 파라미터 : NotifyDto")
	@PostMapping("/write")
	public ResponseEntity<String> insertNotify(@RequestBody NotifyDto notify, @AuthenticationPrincipal User user) throws Exception {

		notify.setMemberEmail(user.getUsername());
		int notifyNum = notifyService.insertNotify(notify);
		if (notifyNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}
	
	@ApiOperation(value = "신고리스트 조회(NotifyDto)", notes = "신고 목록 조회, 파라미터 : NotifyDto")
	@GetMapping("/admin/notify")
	public List<NotifyDto> notifyList(@AuthenticationPrincipal User user) throws Exception {
		return notifyService.notifyList();
	}
	
	@ApiOperation(value = "신고리스트 상세 조회(NotifyDto)", notes = "신고 상세 조회, 파라미터 : NotifyDto")
	@GetMapping("/admin/notify/{notifyNum}")
	public NotifyDto notifyDetail(@PathVariable String notifyNum) throws Exception {
		return notifyService.notifyDetail(notifyNum);
	}
	
}
