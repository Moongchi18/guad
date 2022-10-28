package auction.guad.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import auction.guad.dto.BidDto;
import auction.guad.dto.SellItemDto;

public interface BidService {

	int register(BidDto bidDto); // 입찰하기
	List<BidDto> getList(int memberNum);
	String getBuyerNick(int itemNum);
}
