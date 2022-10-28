package auction.guad.service;

import auction.guad.dto.AuctionDto;

public interface AuctionService {
	
	public int tryAuction(AuctionDto auc) throws Exception;
	public void cancelAuction(AuctionDto auc) throws Exception;
	
	

}
