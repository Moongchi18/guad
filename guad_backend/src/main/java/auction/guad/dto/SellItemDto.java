package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SellItemDto {
	private int itemNum;
	private String sellType;
	private String memberEmail;
	
	private String itemSub;
	private String itemContents;
	private int itemPrice;
	private String itemType;
	private String itemDType;
	private Date writeDate;
	private int hitCnt;
	private int auctionStartPrice;
	private int auctionMaxPrice;
	private int auctionMinPrice;
	private Data auctionPeriod;
	
	private String soldYn;
	private Date soldDate;
	private String deleteYn;
	private Date deleteDate;
}
