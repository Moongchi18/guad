package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;
import auction.guad.service.MileageServiceImpl;
import auction.guad.service.MileageService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("/api/mileage")
public class MileageController {

	@Autowired
	private MileageService mileageService;
	
	@ApiOperation(value = "마일리지 충전", notes = "입금 금액 마일리지 충전")
	@RequestMapping(value = "/mileage", method = RequestMethod.POST)
	public void chargeMileage(
			@Parameter(description = "충전 정보", required = true, example = "{ price: 금액, date: 날짜 }") @RequestBody MileageDto mileage)
			throws Exception {
		mileageService.chargeMileage(mileage);
	}

	@ApiOperation(value = "회원 마일리지 조회", notes = "해당 회원의 마일리지 조회")
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

