package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;
import auction.guad.mapper.MemberMapper;
import auction.guad.mapper.MileageMapper;

@Service
public class MileageServiceImpl implements MileageService{

	
	@Autowired
	private MileageMapper mileageMapper;	
	
	
	public void chargeMileage(MileageDto mileage) throws Exception {	          
	    mileageMapper.chargeMileage(mileage);
	    mileageMapper.chargeMileage2(mileage);
	}
	
	
	public MileageDto inquireMileageByEmail(String memberEmail) throws Exception {
		return mileageMapper.inquireMileageByEmail(memberEmail);
		
	}
	
	public void useMileage(MemberDto member) throws Exception {
		mileageMapper.useMileage(member);
		mileageMapper.usedMileage(member);
	}
	
	public void returnMileage(MemberDto member) throws Exception {
		mileageMapper.returnMileage(member);
		mileageMapper.returnMileage2(member);
	}
}
