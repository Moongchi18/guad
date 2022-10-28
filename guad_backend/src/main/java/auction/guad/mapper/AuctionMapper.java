package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.AuctionDto;

@Mapper
public interface AuctionMapper {

	int tryAuction(AuctionDto auc) throws Exception;
	void cancelAuction(AuctionDto auc) throws Exception;
	
}
