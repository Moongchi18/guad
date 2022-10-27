package auction.guad.service;

import java.util.List;

import auction.guad.dto.BidDto;
import auction.guad.mapper.BidMapper;

public class BidServiceImpl implements BidService{

	BidMapper bidMapper;
	
		
		@Override
		public int register(BidDto bidDto) {
			int isUp = bidMapper.insert(bidDto);
			return isUp;
		}

		@Override
		public List<BidDto> getList(int memberNum) {
			return bidMapper.selectList(memberNum);
		}

		@Override
		public String getBuyerNick(int itemNum) {
			return bidMapper.selectBuyerNick(itemNum);
		}

}	