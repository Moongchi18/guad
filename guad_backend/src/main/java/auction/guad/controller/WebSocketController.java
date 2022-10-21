package auction.guad.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.controller.model.Auction;
import auction.guad.controller.model.Message;
import auction.guad.service.MemberService;

@RestController
public class WebSocketController {

	private SimpMessagingTemplate simpMessagingTemplate;
	private MemberService memberService;

	@Autowired
	public WebSocketController(SimpMessagingTemplate simpMessagingTemplate, MemberService memberService) {
		this.simpMessagingTemplate = simpMessagingTemplate;
		this.memberService = memberService;
	}

	ArrayList<Integer> list = new ArrayList<>();
	{
		for (int i = 0; i < 10; i++) {
			list.add(10000 * (i + 1));
		}
		
	}

	@MessageMapping("/message") // /pub/message
	@SendTo("/sub/public")
	public Message receivePublicMessage(@Payload Message message) {
		System.out.println(">>>>>>>>>>>>>" + message);
		Integer bidPrice = message.getBidPrice();
//		if(bidPrice == null || bidPrice == 0 ) {
//			message.setBidPrice(50000);
//		} else {
//			message.setBidPrice(bidPrice += 500);
//		}
//		
//		System.out.println("result : " + message);

		return message;
	}

	@GetMapping("/bidlist")
	public ArrayList<Integer> testListget() {

		return list;
	}

	@MessageMapping("/bidlist")	
	public Auction testList(@Payload Auction auction, @PathVariable int itemNum) {
		System.out.println("<<<<<<<<<<<<<<<<" + auction);
		list.add(auction.getAuctionMaxPrice());
//		simpMessagingTemplate.convertAndSendToUser(auction.getNickname(), );
		return auction;
	}

}
