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
	private String memberName;
	private String sellType;
	private int startingPrice;
	private int bidPrice;
	private String soldYn;
	
}
