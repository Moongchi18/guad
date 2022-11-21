package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import auction.guad.dto.SellItemDto;
import auction.guad.mapper.SchedulerMapper;

public class SchedulerServiceImpl {
	
	@Autowired
	SchedulerMapper schedulerMapper;

	public List<SellItemDto> auctionPeriodCheck() throws Exception {
		return schedulerMapper.auctionPeriodCheck();
	}
	
	public void auctionSellitemUpdate(SellItemDto sellItem) throws Exception{
		schedulerMapper.auctionSellitemUpdate(sellItem);
	}
	
	public void auctionDelete(SellItemDto sellItem) throws Exception {
		schedulerMapper.auctionDelete(sellItem);
	}
	public int auctionResultInsert(SellItemDto sellItem) throws Exception {
		return schedulerMapper.auctionResultInsert(sellItem);
	}
}
