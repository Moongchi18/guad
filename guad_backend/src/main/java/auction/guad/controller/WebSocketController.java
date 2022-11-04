package auction.guad.controller;

import java.util.ArrayList;

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
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class WebSocketController {

    @Autowired
    AuctionService aucService;
    
	private final SimpMessagingTemplate simpMessagingTemplate;
	private final MemberService memberService;
	private final JwtTokenUtil jwtTokenUtil;
	
	int bid = 10000;
	int result;

    @MessageMapping("/message/{itemNum}")
    @SendTo("/sub/chat/{itemNum}")
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
		int bidNum = aucService.tryAuction(auction);
        if (bidNum > 0) {
         simpMessagingTemplate.convertAndSendToUser(Integer.toString(auction.getItemNum()), "/sub/"+itemNum+"/bidlist", auction);
         bid = auction.getAuctionPrice();
        return auction;
        } return null;
}
}
