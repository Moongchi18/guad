package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.controller.model.Auction;
import auction.guad.dto.AuctionDownDto;


@Mapper
public interface AuctionMapper {

	int tryAuction(Auction auc) throws Exception;
	void cancelAuction(Auction auc) throws Exception;
	int naelimRandomCount(int itemNum) throws Exception;
	void naelimRandomPerDiscountInsert(int perDiscount, int itemNum) throws Exception;
	List<AuctionDownDto> naelimRandomPerDiscountAll (int itemNum) throws Exception;
}
