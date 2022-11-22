package auction.guad.mapper;

import java.util.List;

import auction.guad.dto.SellItemDto;

public interface SchedulerMapper {
	List<SellItemDto> auctionPeriodCheck() throws Exception;
	void auctionSellitemUpdate(SellItemDto sellitem) throws Exception;
	void auctionDelete(SellItemDto sellitem) throws Exception;
	int auctionResultInsert(SellItemDto sellitem) throws Exception;
	
}
