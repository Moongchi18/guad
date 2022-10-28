package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.AuctionDto;
import auction.guad.service.AuctionService;
import auction.guad.service.MileageService;
import io.swagger.annotations.ApiOperation;
import auction.guad.dto.MemberDto;

@RestController
@RequestMapping("/auction")
public class AuctionController {

	@Autowired
	private AuctionService aucService;
	
	@Autowired
	private MileageService mileageService;
	
	@ApiOperation(value = "입찰", notes = "구매자 입찰 시도")
	@PostMapping("/auction")
	public void tryAuction(AuctionDto auc, MemberDto member) throws Exception {
		aucService.tryAuction(auc);
		int result = aucService.tryAuction(auc);
		if(result == 1) {
			mileageService.useMileage(member);
		}
	}
	
	@ApiOperation(value = "입찰 취소")
	@PostMapping("/auction/{auctionNum}")
	public void cancelAuction(AuctionDto auc, MemberDto member) throws Exception {
		aucService.cancelAuction(auc);
		mileageService.returnMileage(member);
	}
}
	
	
