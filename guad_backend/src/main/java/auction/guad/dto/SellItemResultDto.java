package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SellItemResultDto {

	private int itemNumResult;
	private int itemNum;
	private char sellType;
	private String sellerEmail;
	private String sellerPhone;
	private String buyerEmail;
	private String buyerPhone;
	private String address;
	
	private String itemSub;
	private int itemPrice;
	
	private Date soldDate;
}
