package auction.guad.service;

import java.util.List;

import auction.guad.dto.SellItemDto;

public interface SchedulerService {

	public List<SellItemDto> auctionperiodcheck() throws Exception;
	public void auctionSellitemUpdate(SellItemDto sellItem) throws Exception;
	public void auctionDelete(SellItemDto sellItem) throws Exception;
	public void auctionResultInsert(SellItemDto sellItem) throws Exception;
	
}
