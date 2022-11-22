package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;

@Mapper
public interface SchedulerMapper {
	List<SellItemResultDto> auctionPeriodCheck() throws Exception;
	void auctionSellitemUpdate(int itemNum) throws Exception;
	int auctionResultInsert(SellItemResultDto sellItemResultDto) throws Exception;
	void auctionDelete(SellItemDto sellitem) throws Exception;
	
}
