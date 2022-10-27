package auction.guad.dto;

import org.apache.ibatis.type.Alias;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Alias("biddto")
public class BidDto {

	private int bidNum;
	private String buyer;
	private int bidPrice;
	private int bidStatus;
		
	private int itemNum;
	private String nickname;
	private String itemSub;
	private String img;
	
	
	public BidDto() {}

	public BidDto(String buyer, int itemNum, int bidPrice, int bidStatus) {
		this.buyer = buyer;
		this.itemNum = itemNum;
		this.bidPrice = bidPrice;
		this.bidStatus = bidStatus;
	}
	
}
