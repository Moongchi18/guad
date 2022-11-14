package auction.guad.service;

import java.util.List;

import auction.guad.controller.model.Auction;
import auction.guad.dto.AuctionDownDto;


public interface AuctionService {
	
	public int tryAuction(Auction auc) throws Exception;
	public void cancelAuction(Auction auc) throws Exception;
	public int naelimRandomCount(int itemNum)throws Exception;
	public void naelimRandomPerDiscountInsert(int perDiscount, int itemNum) throws Exception;
	public List<AuctionDownDto> naelimRandomPerDiscountAll(int itemNum) throws Exception;
}
