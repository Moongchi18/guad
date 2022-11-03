package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.MemberDto;
import auction.guad.dto.MileageDto;

@Mapper
public interface MileageMapper {
 
    void chargeMileage2(MileageDto mileageDto) throws Exception;
	void chargeMileage(MileageDto mileageDto) throws Exception;
	MileageDto inquireMileageByEmail(String memberEmail) throws Exception;
	void useMileage(MemberDto member) throws Exception;
	void usedMileage(MemberDto member) throws Exception;
	void returnMileage(MemberDto member) throws Exception;
	void returnMileage2(MemberDto member) throws Exception;
}
