package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.MileageDto;
import auction.guad.mapper.MileageMapper;

@Service
public class MileageServiceImpl implements MileageService{

	
	@Autowired
	private MileageMapper mileageMapper;
	
	
	public int chargeMileage(MileageDto mileageDto) throws Exception {
		return mileageMapper.chargeMileage(mileageDto);
		
	}
	
	
	public MileageDto inquireMileageByEmail(String memberEmail) throws Exception {
		return mileageMapper.inquireMileageByEmail(memberEmail);
		
	}
	
	
}
