package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.controller.model.Auction;
import auction.guad.dto.AuctionDto;
import auction.guad.mapper.AuctionMapper;

@Service
public class AuctionServiceImpl implements AuctionService{

	@Autowired
	AuctionMapper aucMapper;
	
	@Override
	public int tryAuction(Auction auc) throws Exception {
				
		return aucMapper.tryAuction(auc);
		
	}
	
	@Override
	public void cancelAuction(Auction auc) throws Exception {
		
		aucMapper.cancelAuction(auc);
	}
	
}
