package auction.guad.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import auction.guad.dto.MemberDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.service.MemberService;
import auction.guad.service.SellItemResultService;
import auction.guad.service.SellItemService;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellItemJoinMemberVo;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class SellItemResultController {

	final private SellItemResultService sellItemResultService;
	final private SellItemService sellItemService;
	final private MemberService memberService;
	/////////////////////////////////////////////////////////////////////////////
	
	
	@ApiOperation(value = "거래 결과(SellItemResultDto)", notes = "모든 상품 거래 결과 입력, 파라미터 : SellItemResultDto")
	@PostMapping("/sell")
	public ResponseEntity<Boolean> insertResult(@RequestBody RequestTradeVo requestTrade, @AuthenticationPrincipal User user) throws Exception{
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetail(requestTrade.getItemNum());

		requestTrade.setBuyerEmail(user.getUsername());
		requestTrade.setSellerEmail(sellItem.getMemberEmail());
		
		MemberDto seller = memberService.selectMemberDetailByEmail(requestTrade.getSellerEmail());
		MemberDto buyer = memberService.selectMemberDetailByEmail(requestTrade.getBuyerEmail());
		
		requestTrade.setBuyerPhone(buyer.getPhone());
		requestTrade.setSellerPhone(seller.getPhone());
		System.out.println("tttttttttttttttttttttttttttttt" + requestTrade);
		boolean result = sellItemResultService.normalTrade(requestTrade);
		System.out.println("ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ : " + result);
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}
	
	@ApiOperation(value = "거래결과 조회(buyerEmail)", notes = "buyerEmail을 기준으로 거래결과 조회, 파라미터 : buyerEmail")
	@GetMapping("/sell/{itemNum}")
	public ResponseEntity<RequestTradeVo> selectTradeResult(@PathVariable int itemNum, @AuthenticationPrincipal User user) throws Exception{
		RequestTradeVo requestVo = sellItemResultService.selectOneByBuyerEmailAndItemNum(user.getUsername(), itemNum);
		System.out.println(requestVo);
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(requestVo);
		}
	}
	
}
