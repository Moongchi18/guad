package auction.guad.dto;

import lombok.Data;

@Data
public class MemberDto {
	private int memberNum;
	private String memberName;
	private String memberPass;
	private String memberEmail;
	private String phone;
	private String joinDateTime;
	private String updaterId;
	private String updatedDateTime;
}
