package auction.guad.dto;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {

	private int memberNum;
	private String nickname;
	private String pass;
	private String email;
	private String phone;
	private String address;
	private String addressDetail;
	private Date joinDateTime;
	private String gender;
	private int mileage;
	private int mileageUsed;
	private String managerYn;
	private String deleteYn;
	private Date updatedDateTime;

}
