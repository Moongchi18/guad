package auction.guad.controller;

import java.util.ArrayList;

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
import auction.guad.service.MemberService;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MemberService memberService;
	private final JwtTokenUtil jwtTokenUtil;

	
	ArrayList<Integer> list1 = new ArrayList<>();
	{
		for (int i = 0; i < 10; i++) {
			list1.add(10000 * (i + 1));
		}
		
	}
	ArrayList<Integer> list2 = new ArrayList<>();
	{
		for (int i = 0; i < 10; i++) {
			list2.add(20000 * (i + 1));
		}
		
	}
    @MessageMapping("/message")
    @SendTo("/sub/public")
    public Message receiveMessage(@Payload Message message){
    	System.out.println("테스트<<<<<<<<<<<<<<<<<<<<<<<<<");
        return message;
    }

    
	@GetMapping("/bidlist")
	public Integer testListget(int itemNum) {
		System.out.println("bidlist호출");
		int length1 = list1.size();
		int length2 = list2.size();
		if(itemNum==1) {
			return list1.get(length1-1);
		} else {
			return list2.get(length2-1);
		}
	}
	
	@MessageMapping("/bidlist/{itemNum}")
	@SendTo("/sub/{itemNum}/bidlist")
	public Auction testList(@Payload Auction auction, @DestinationVariable int itemNum, @Header String Authorization) {
		
		String token = Authorization.substring(7);
		Claims claims = jwtTokenUtil.getAllClaimsFromToken(token);
		MemberDto member = memberService.loginContainPass(claims.getSubject());
		
		System.out.println("<<<<<<<< " + member);
		if(itemNum==1) {
			auction.setAuctionMaxPrice(list1.get(list1.size()-1) + auction.getAuctionMaxPrice());
			list1.add(auction.getAuctionMaxPrice());
		} else {
			auction.setAuctionMaxPrice(list2.get(list2.size()-1) + auction.getAuctionMaxPrice());
			list2.add(auction.getAuctionMaxPrice());
		}
		
		simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()), "/sub/"+itemNum+"/bidlist", auction);
		return auction;
	}
	

}
