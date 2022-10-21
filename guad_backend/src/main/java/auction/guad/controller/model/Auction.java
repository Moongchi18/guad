package auction.guad.controller.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Auction {

	private int itemNum;
	private int auctionMaxPrice;
	private String nickname;
	private String email;
	
}
