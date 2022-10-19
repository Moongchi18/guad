package auction.guad.dto;

import lombok.Data;

@Data
public class MemberDto {

	private Integer memberNum;
	private String memberName;
	private String memberNickname;
	private String memberPass;
	private String memberEmail;
	private String phone;
	private String joinDateTime;
	private String gender;
	private String birth;
	private int mileage;
	private int mileageUsed;
	private String managerYn;
	private String deletedYn;
}
