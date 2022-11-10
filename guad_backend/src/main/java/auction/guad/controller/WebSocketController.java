package auction.guad.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.controller.model.Auction;
import auction.guad.controller.model.Message;
import auction.guad.dto.MemberDto;
import auction.guad.security.JwtTokenUtil;
import auction.guad.service.AuctionService;
import auction.guad.service.MemberService;
import auction.guad.service.SellItemService;
import auction.guad.vo.SellItemJoinMemberVo;
import io.jsonwebtoken.Claims;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

	@Autowired
//	private AuctionService auctionService;
	
    private final AuctionService auctionService;
    private final SellItemService sellItemService;
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MemberService memberService;
	private final JwtTokenUtil jwtTokenUtil;
	
	int bid = 10000;
	int result;

    @MessageMapping("/up/{itemNum}")
    @SendTo("/sub/up/{itemNum}")
    public Message receiveMessage(@Payload Message message, @DestinationVariable("itemNum")int itemNum){
    	System.out.println("테스트<<<<<<<<<<<<<<<<<<<<<<<<<");
    	
    	
    	
    	
        return message;
    }

    
	@GetMapping("/bidlist")
	public Integer testListget(int itemNum) {
		return bid;
	}
	
	@MessageMapping("/bidlist/{itemNum}")
	@SendTo("/sub/{itemNum}/bidlist")
	public Auction testList(@Payload Auction auction, @DestinationVariable int itemNum, @Header String Authorization) throws Exception {
		System.out.println("<<<<<<<<<<"+auction);
		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());
		auction.setNickname(member.getNickname());
		auction.setMemberEmail(member.getEmail());
		int bidNum = auctionService.tryAuction(auction);
        if (bidNum > 0) {
         simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()), "/sub/"+itemNum+"/bidlist", auction);
         bid = auction.getAuctionPrice();
        return auction;
        }
        return null;
}
	
	

	

		

	
	
	@ApiOperation(value = "내림 경매 상세 조회", notes = "등록된 게시물 상세 정보를 조회")
	@MessageMapping("/sellitem/auction/d/{itemNum}")
	@SendTo("/sub/sellitem/auction/d/{itemNum}")
	public ResponseEntity<Integer> openNaelimSellItemDetail(@Payload @DestinationVariable int itemNum, @Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailContainHitCnt(itemNum);

		
		int CurrentPrice;
		LocalDate now = LocalDate.now(); //현재날짜
		int startday;	String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());
		//날짜 형식 지정
		SimpleDateFormat newDtFormat = new SimpleDateFormat("yyyy-MM-dd");
		//날짜를 지정된 형식으로 변경
//		String strNewDtFormat = newDtFormat.format(sellItem.getWriteDate().getDay());
//		String nowNewDtFormat = newDtFormat.format(now);
		//문자열을 데이트 형식으로 변경해줌
//		Date date1 = newDtFormat.parse(strNewDtFormat);
//		Date date2 = newDtFormat.parse(nowNewDtFormat);
	
		
		int Discount = sellItem.getAuctionDiscountPerHour();
		int MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		sellItem.getWriteDate();
		sellItem.getAuctionPeriod();
		
		Date now4 = new Date();
		boolean result = now4.before(sellItem.getWriteDate());
		
		System.out.println(">>>>>>>>>>>>>>>>"+now);
//		System.out.println(">>>>>>>>>>>>>>>>"+strNewDtFormat);
		System.out.println(">>>>>>>>>>>>>>>>"+sellItem.getWriteDate());
//		System.out.println(">>>>>>>>>>>>>>>>"+nowNewDtFormat);
		System.out.println(">>>>>>>>>>>>>>>>"+sellItem.getWriteDate().getDate());
		System.out.println(">>>>>>>>>>>>>>>>"+sellItem.getWriteDate().getHours());
		System.out.println(">>>>>>>>>>>>>>>>"+(sellItem.getWriteDate().getHours()+100));
		System.out.println(">>>>>>>>>>>>>>>>"+result);
		   now4.setDate(sellItem.getWriteDate().getDate());
		   now4.getTime();
		   
		   
//		CurrentPrice = StratPrice - (*(Discount));
		
//		if (CurrentPrice == 0) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		} else {
//			return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
//		}
		   return null;
		   
	}


		
//        if (bidNum > 0) {
//         simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()), "/sub/bidlist/"+itemNum, auction);
//         bid = auction.getAuctionPrice();
//        return auction;
//        } 
//        return null;
        
        
//        SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailContainHitCnt(itemNum);
//		System.out.println(sellItem);
//		
//		sellItem.getAuctionDiscountPerHour();
//		sellItem.getAuctionMinPrice();
//		sellItem.getAuctionStartPrice();
//		sellItem.getAuctionPeriod();
//		
//		
//		
//		sellItem.setCurrentPrice(980000000);
//		
//		if (sellItem == null) {
//			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//		} else {
//			sellItem.setMemberEmail(" ");
//			return ResponseEntity.status(HttpStatus.OK).body(sellItem);
//		}
//        
//}	
	
	
	
	
}
