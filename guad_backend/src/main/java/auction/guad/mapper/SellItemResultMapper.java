package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemResultDto;

@Mapper
public interface SellItemResultMapper {
	
	int insertSellItemResult(SellItemResultDto sellItemResultDto) throws Exception;

}
