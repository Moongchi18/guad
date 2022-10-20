package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class MemberDto {

	private int memberNum;
	private String nickname;
	private String pass;
	private String email;
	private String phone;
	private Date joinDateTime;
	private String address;
	private String gender;
	private int mileage;
	private int mileageUsed;
	private String managerYn;
	private String deletedYn;
	private Date updatedDateTime;

}
