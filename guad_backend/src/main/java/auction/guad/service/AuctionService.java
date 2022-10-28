package auction.guad.service;

import auction.guad.dto.AuctionDto;

public interface AuctionService {
	
	public int tryBid(AuctionDto auc) throws Exception;
	public void cancelBid(AuctionDto auc) throws Exception;
	
	

}
