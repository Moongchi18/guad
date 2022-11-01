package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.controller.model.Auction;


@Mapper
public interface AuctionMapper {

	int tryAuction(Auction auc) throws Exception;
	void cancelAuction(Auction auc) throws Exception;
	
}
