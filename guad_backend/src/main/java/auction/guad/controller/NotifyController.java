package auction.guad.controller;

import java.util.ArrayList;
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
import auction.guad.service.ImgService;
import auction.guad.service.NotifyService;
import auction.guad.vo.NotifyVo;
import io.swagger.annotations.ApiOperation;


@RestController
@RequestMapping("/notify")
public class NotifyController {
	
	private NotifyService notifyService;
	private ImgService imgService;
	BCryptPasswordEncoder encoder;
	
	@Autowired
	public NotifyController(NotifyService notifyService, ImgService imgService) {
		this.notifyService = notifyService;
		this.imgService = imgService;
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
	@GetMapping("/admin/list")
	public List<NotifyDto> notifyList(@AuthenticationPrincipal User user) throws Exception {
		
		List<NotifyDto> NotifyList = notifyService.notifyList();
	
		
		
		
		for(int i=0; i<NotifyList.size(); i++) {
			imgService.selectImgByItemImgNumFirst(NotifyList.get(i).getItemNum());
		}
		
		return notifyService.notifyList();
	}
	
	
//	@GetMapping(value = "image/{imagename}", produces = MediaType.IMAGE_JPEG_VALUE)
//	public ResponseEntity<byte[]> userSearch(@PathVariable("imagename") String imagename) throws IOException {
//		InputStream imageStream = new FileInputStream("C://images/feed/" + imagename);
//		byte[] imageByteArray = IOUtils.toByteArray(imageStream);
//		imageStream.close();
//		return new ResponseEntity<byte[]>(imageByteArray, HttpStatus.OK);
//	}
	
	
	
	@ApiOperation(value = "신고리스트 상세 조회(NotifyDto)", notes = "신고 상세 조회, 파라미터 : NotifyDto")
	@GetMapping("/admin/{notifyNum}")
	public NotifyVo notifyDetail(@PathVariable String notifyNum) throws Exception {
		System.out.println(">>>>>>>>>>>>>>>>>"+ notifyNum);
		System.out.println(">>>>>>>>>>>>>>>>>"+ notifyService.notifyDetail(notifyNum));
		
		
		return notifyService.notifyDetail(notifyNum);
		
	}
	

	
}
