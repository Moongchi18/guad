package auction.guad.mapper;

import auction.guad.dto.AuctionDto;


public interface AuctionMapper {

	int tryBid(AuctionDto auc) throws Exception;
	void cancelBid(AuctionDto auc) throws Exception;
	
}
