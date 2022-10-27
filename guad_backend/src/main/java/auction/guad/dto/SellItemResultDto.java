package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SellItemResultDto {

	private int itemNumResult;
	private char sellType;
	private String sellerEmail;
	private String sellerPhone;
	private String buyerEmail;
	private String buyerPhone;
	
	private String itemSub;
	private int itemPrice;
	
	private Date soldDate;
}
