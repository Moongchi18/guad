package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import auction.guad.dto.SellItemResultDto;
import auction.guad.service.SellItemResultService;
import io.swagger.annotations.ApiOperation;

@Controller
public class SellItemResultController {

	private SellItemResultService sellItemResultService;
	@Autowired
	public SellItemResultController(SellItemResultService sellItemResultService) {
		this.sellItemResultService = sellItemResultService;
	}
	/////////////////////////////////////////////////////////////////////////////
	
	
//	@ApiOperation(value = "거래 결과(SellItemResultDto)", notes = "모든 상품 거래 결과 입력, 파라미터 : SellItemResultDto")
//	@PostMapping("/sell")
//	public ResponseEntity<Stirng> insertResult(@RequestBody SellItemResultDto sellDto){
//		
//		return response
//	}
	
}
