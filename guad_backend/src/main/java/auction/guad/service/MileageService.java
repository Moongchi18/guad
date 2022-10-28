package auction.guad.service;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;

public interface MileageService {
	
	public int chargeMileage(MileageDto mileageDto) throws Exception;
	public MileageDto inquireMileageByEmail(String memberEmail) throws Exception;
	
	public void useMileage(MemberDto member) throws Exception;
	public void returnMileage(MemberDto member) throws Exception;
}
