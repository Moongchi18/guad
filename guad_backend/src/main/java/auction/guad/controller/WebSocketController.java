package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.controller.model.Auction;
import auction.guad.controller.model.Message;

@RestController
public class WebSocketController {
	
	
	private SimpMessagingTemplate simpMessagingTemplate;
	@Autowired
	public WebSocketController(SimpMessagingTemplate messagingTemplate) {
		this.simpMessagingTemplate = messagingTemplate;
	}
	
	@MessageMapping("/message") // /app/message
	@SendTo("/sub/public")
	public Message receivePublicMessage(@Payload Message message) {
		System.out.println(message);
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
	
	@MessageMapping("/auction/1")
	@SendTo("/sub/auction/1")
	public Auction auctionSocket1(@Payload Auction auction) {
		System.out.println("옥션1");
		
		return auction;
	}
	@MessageMapping("/auction/2")
	@SendTo("/sub/auction/2")
	public Auction auctionSocket2(@Payload Auction auction) {
		System.out.println("2옥션");
		auction.setMemberName("옥션2입니다.");
		return auction;
	}
	
//	@MessageMapping("/private-message")
//	public Message receivePrivateMessage(@Payload Message message) {
//		simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "private", message);
//		return message;
//	}
	
//	@MessageMapping("/bid")
//	public void bid(Auction auction, SimpMessageHeaderAccessor accessor) {
//		simpMessagingTemplate.convertAndSend("/sub/bid/"+auction.getItemNum(), auction);
//	}
	
}
