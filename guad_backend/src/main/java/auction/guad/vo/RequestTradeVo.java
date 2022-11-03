package auction.guad.vo;

import java.util.Date;

import lombok.Data;

@Data
public class RequestTradeVo {

	private char sellType;
	private String sellerEmail;
	private String sellerPhone;
	private String buyerEmail;
	private String buyerPhone;
	private String address;
	
	private String itemSub;
	private int itemPrice;
	
	private Date soldDate;
	
	private int itemNum;
	private char soldYn;
	private int mileage;
	
}
