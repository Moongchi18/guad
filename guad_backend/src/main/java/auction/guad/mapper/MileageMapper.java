package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.MileageDto;

@Mapper
public interface MileageMapper {
 
	
	int chargeMileage(MileageDto mileageDto) throws Exception;
	MileageDto inquireMileageByEmail(String memberEmail) throws Exception;
	
}
