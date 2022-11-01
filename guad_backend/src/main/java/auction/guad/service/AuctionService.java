package auction.guad.service;

import auction.guad.controller.model.Auction;


public interface AuctionService {
	
	public int tryAuction(Auction auc) throws Exception;
	public void cancelAuction(Auction auc) throws Exception;
	
	

}
