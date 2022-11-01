package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import auction.guad.dto.NotifyDto;
import auction.guad.service.NotifyService;
import io.swagger.annotations.ApiOperation;

@RestController
public class NotifyController {
	
	NotifyService notifyService;
	BCryptPasswordEncoder encoder;
	
	@Autowired
	public NotifyController(NotifyService notifyService) {
		this.notifyService = notifyService;
	}
	
	
	@ApiOperation(value = "신고등록(NotifyDto)", notes = "신고등록, 파라미터 : NotifyDto")
	@PostMapping("/notify/write")
	public ResponseEntity<String> insertMember(@RequestBody NotifyDto notify) throws Exception {
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<" + notify.getNotifyTitle());
		
		int notifyNum = notifyService.insertNotify(notify);
		if (notifyNum > 0) {
			return ResponseEntity.status(HttpStatus.OK).body("등록성공");
		} else {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("등록실패");
		}
	}
	
	
	
	
	
	
	
}
