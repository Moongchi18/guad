package auction.guad.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

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
import auction.guad.dto.AuctionDownDto;
import auction.guad.dto.MemberDto;
import auction.guad.dto.SellItemResultDto;
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

	@ApiOperation(value = "내림 경매 상세 조회", notes = "내림 경매 상세 정보를 조회")
	@MessageMapping("/sellitem/auction/d/{itemNum}")
	@SendTo("/sub/sellitem/auction/d/{itemNum}")
	public ResponseEntity<Long> openNaelimSellItemDetail(@Payload @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		int discount = sellItem.getAuctionDiscountPerHour();
		long MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		long auctionFinish = 0;
		long auctionNotyet = -1;

		// 현재날짜
		Date now = new Date();
		// 경매시작 날짜
		Date auctionStart = (Date) sellItem.getWriteDate().clone();
		auctionStart.setSeconds(0);
		auctionStart.setMinutes(0);
		auctionStart.setHours(12);
		auctionStart.setDate(auctionStart.getDate() + 1);
		// 현재날짜와 경매시작 날짜의 차이(시간)
		double timeChange = ((now.getTime() - auctionStart.getTime()) / 3600000);
		// 현재시각과 경매종료날짜 비교
		boolean result = now.before(sellItem.getAuctionFinishDate());
		// 현재시각과 경매시작날짜 비교
		boolean result2 = now.before(auctionStart);
		// 현재 내림경매가
		long CurrentPrice = (long) (StartPrice - (Math.floor(timeChange) * discount));

		if (result2) {
			return ResponseEntity.status(HttpStatus.OK).body(auctionNotyet);
		} else {
			if (result) {
				if (CurrentPrice < MinPrice) {
					return ResponseEntity.status(HttpStatus.OK).body(MinPrice);
				} else {
					return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
				}
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(auctionFinish);
			}
		}

	}

	@ApiOperation(value = "내림 경매 랜덤 상세 조회", notes = "내림 경매 랜덤 정보를 조회")
	@MessageMapping("/sellitem/auction/dr/{itemNum}")
	@SendTo("/sub/sellitem/auction/dr/{itemNum}")
	public ResponseEntity<Long> openNaelimSellItemDetail_R(@Payload @DestinationVariable int itemNum,
			@Header String Authorization) throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(itemNum);

		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());

		int discount;
		// 랜덤 숫자 생성
		int perDiscount = (int) (Math.random() * 4 + 1);
		int perDiscountAll = 0;

		long MinPrice = sellItem.getAuctionMinPrice();
		int StartPrice = sellItem.getAuctionStartPrice();
		long auctionFinish = 0;
		long auctionNotyet = -1;

		// 현재날짜
		Date now = new Date();
		// 경매시작 날짜
		Date auctionStart = (Date) sellItem.getWriteDate().clone();
		auctionStart.setSeconds(0);
		auctionStart.setMinutes(0);
		auctionStart.setHours(12);
		auctionStart.setDate(auctionStart.getDate() + 1);
		// 현재날짜와 경매시작 날짜의 차이(시간)
		double timeChange = ((now.getTime() - auctionStart.getTime()) / 3600000);
		// 현재시각과 경매종료날짜 비교
		boolean result = now.before(sellItem.getAuctionFinishDate());
		// 현재시각과 경매시작날짜 비교
		boolean result2 = now.before(auctionStart);

		// 서비스 작성 : 동일 아이템 넘버 auction_down 테이블의 갯수를 카운트 한다.
		int naelimRandomcheck = auctionService.naelimRandomCount(itemNum);
		// 서비스 작성 : 위숫자보다 적은경우 하나의 랜덤 정수를 생성해 인서트 해준다.
		if (Math.floor(timeChange) > naelimRandomcheck) {
			auctionService.naelimRandomPerDiscountInsert(perDiscount, itemNum);
		}
		// 동일 아이템 넘버 auction_down 테이블의 auction_per값을 모두 불러와 더해준다. (반복문)
		List<AuctionDownDto> perDiscountList = auctionService.naelimRandomPerDiscountAll(itemNum);
		for (int i = 0; i < perDiscountList.size(); i++) {
			perDiscountAll += perDiscountList.get(i).getAuctionPer();
		}
		// 현재 내림랜덤경매가 : 가져온 per값으로 현재가격을 계산에 내려준다.
		long CurrentPrice = (long) (StartPrice - (StartPrice * (perDiscountAll / 100)));
		
		System.out.println(">>>>>>>>>>>>>>>>>>" + naelimRandomcheck);
		System.out.println(">>>>>>>>>>>>>>>>>>" + result2);
		System.out.println(">>>>>>>>>>>>>>>>>>" + perDiscountList);
		System.out.println(">>>>>>>>>>>>>>>>>>" + CurrentPrice);
		
		if (result2) {
			return ResponseEntity.status(HttpStatus.OK).body(auctionNotyet);
		} else {
			if (result) {
				if (CurrentPrice < MinPrice) {
					return ResponseEntity.status(HttpStatus.OK).body(MinPrice);
				} else {
					return ResponseEntity.status(HttpStatus.OK).body(CurrentPrice);
				}
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(auctionFinish);
			}
		}
	}
}
