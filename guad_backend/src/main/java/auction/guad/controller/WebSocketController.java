package auction.guad.controller;

import java.util.Calendar;
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
	public Message receiveMessage(@Payload Message message, @DestinationVariable("itemNum") int itemNum) {
		System.out.println("테스트<<<<<<<<<<<<<<<<<<<<<<<<<");
		return message;
	}

	@GetMapping("/bidlist")
	public Integer testListget() {
		return bid;
	}

	@MessageMapping("/bidlist/{itemNum}")
	@SendTo("/sub/{itemNum}/bidlist")
	public Auction testList(@Payload Auction auction, @DestinationVariable int itemNum, @Header String Authorization)
			throws Exception {
		System.out.println("<<<<<<<<<<" + auction);
		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());
		auction.setNickname(member.getNickname());
		auction.setMemberEmail(member.getEmail());
		int bidNum = auctionService.tryAuction(auction);
		if (bidNum > 0) {
			simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()),
					"/sub/" + itemNum + "/bidlist", auction);
			bid = auction.getAuctionPrice();
			return auction;
		}
		return null;
	}

	@ApiOperation(value = "내림 경매 상세 조회", notes = "등록된 게시물 상세 정보를 조회")
	@MessageMapping("/sellitem/auction/d/{itemNum}")
	@SendTo("/sub/sellitem/auction/d/{itemNum}")
	public ResponseEntity<Long> openNaelimSellItemDetail(@Payload @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		
		int Discount = sellItem.getAuctionDiscountPerHour();
		long MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		int periodDay = sellItem.getAuctionPeriodDay();
		int periodTime = sellItem.getAuctionPeriodTime();
		long auctionfinish = 0;

		// 현재날짜
		Date now = new Date();
		//경매시작 날짜
		Date auctionStart = (Date) sellItem.getWriteDate().clone();
		auctionStart.setSeconds(0);
		auctionStart.setMinutes(0);
		auctionStart.setHours(12);
		auctionStart.setDate(auctionStart.getDate()+1);
		// 현재날짜와 경매시작 날짜의 차이(시간)
		double timeChange = ((now.getTime()-auctionStart.getTime())/3600000);
		// 현재시각과 경매종료날짜 비교
		boolean result = now.before(sellItem.getAuctionFinishDate());
		// 현재 내림경매가
		long CurrentPrice = (long) (StartPrice - (Math.floor(timeChange) * Discount));
		
		
		System.out.println(">>>>>>>>>>>>>>>>>>"+auctionStart.getTime());
		System.out.println(">>>>>>>>>>>>>>>>>>"+now.getTime());
		System.out.println(">>>>>>>>>>>>>>>>>>"+auctionStart);
		System.out.println(">>>>>>>>>>>>>>>>>>"+sellItem.getWriteDate());
		System.out.println(">>>>>>>>>>>>>>>>>>"+StartPrice);
		System.out.println(">>>>>>>>>>>>>>>>>>"+StartPrice);
		System.out.println(">>>>>>>>>>>>>>>>>>"+Math.floor(timeChange) * Discount);
		System.out.println(">>>>>>>>>>>>>>>>>>"+CurrentPrice);
		System.out.println(">>>>>>>>>>>>>>>>>>"+result);
		
		if (result) {
			if (CurrentPrice < MinPrice) {
				return ResponseEntity.status(HttpStatus.OK).body(MinPrice);
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
			}
		} else {
			return ResponseEntity.status(HttpStatus.OK).body(auctionfinish);
		}
	}

//		Date now4 = new Date();
//		now4.setDate(1,1,1,1,1,1);
//		now4.getTime();
	// 날짜 형식 지정
//		SimpleDateFormat newDtFormat = new SimpleDateFormat("yyyy-MM-dd");
	// 날짜를 지정된 형식으로 변경
//		String strNewDtFormat = newDtFormat.format(sellItem.getWriteDate().getDay());
//		String nowNewDtFormat = newDtFormat.format(now);
	// 문자열을 데이트 형식으로 변경해줌
//		Date date1 = newDtFormat.parse(strNewDtFormat);
//		Date date2 = newDtFormat.parse(nowNewDtFormat);

//		Calendar cal1 = Calendar.getInstance();
//		cal1.add(Calendar.DATE, 6); // 일 계산
//		cal1.add(Calendar.MONTH, 4); // 월 연산
//		cal1.add(Calendar.DATE, -3); // 빼고 싶다면 음수 입력
//
//		Date date = new Date(cal1.getTimeInMillis());

}
