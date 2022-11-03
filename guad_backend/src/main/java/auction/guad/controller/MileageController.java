package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;
import auction.guad.service.MileageServiceImpl;
import auction.guad.service.MemberService;
import auction.guad.service.MileageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class MileageController {

	@Autowired
	MileageService mileageService;	
 
	MemberService memberService;
	
	@ApiOperation(value = "마일리지 충전", notes = "입금 금액 마일리지 충전")
	@PostMapping("/mileage")
	public void chargeMileage(@RequestBody MileageDto mileage, @AuthenticationPrincipal User user)
			throws Exception {
	    mileage.setMemberEmail(user.getUsername());
		mileageService.chargeMileage(mileage);
		
	}
   
	@ApiOperation(value = "마일리지 사용", notes = "금액만큼 마일리지 차감 + 누적 마일리지 증가")
    @PostMapping("/mileage/pay")
    public void useMileage(@RequestBody MemberDto member, @AuthenticationPrincipal User user)
            throws Exception {
        member.setEmail(user.getUsername());
        mileageService.useMileage(member);        
    }	
	

	@ApiOperation(value = "마일리지 충전내역 조회", notes = "해당 회원의 마일리지 충전 내역 조회")
	@RequestMapping(value = "/mileage/{mileageNum}", method = RequestMethod.GET)
	public ResponseEntity<MileageDto> inquireMileage(
			@Parameter(description = "회원 이메일", required = true, example = "1") @PathVariable("memberEmail") String memberEmail)
			throws Exception {
		MileageDto mileageDto = mileageService.inquireMileageByEmail(memberEmail);
		if (mileageDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			
			return ResponseEntity.ok(mileageDto);
		}
	}
}

