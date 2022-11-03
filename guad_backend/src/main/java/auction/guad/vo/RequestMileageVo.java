package auction.guad.vo;

import java.util.Date;

import lombok.Data;

@Data
public class RequestMileageVo {

	private String email;
	private Date chargeDate;
	private int chargeAmount;
	private String chargeMethod;
	
	// 
	private int itemPrice;

	public RequestMileageVo(String email, int itemPrice) {
		this.email = email;
		this.itemPrice = itemPrice;
	}
	
	
}
