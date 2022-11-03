package auction.guad.vo;

import java.util.Date;

import lombok.Data;

@Data
public class RequestMileageVo {

	private String memberEmail;
	private Date chargeDate;
	private int chargeAmount;
	private String chargeMethod;
	
	// 
	private int itemPrice;

	public RequestMileageVo(String memberEmail, int itemPrice) {
		this.memberEmail = memberEmail;
		this.itemPrice = itemPrice;
	}
	
	
}
