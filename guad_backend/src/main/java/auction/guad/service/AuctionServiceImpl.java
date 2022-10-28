package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.AuctionDto;
import auction.guad.mapper.AuctionMapper;

@Service
public class AuctionServiceImpl implements AuctionService{

	@Autowired
	AuctionMapper aucMapper;
	
	public int tryAuction(AuctionDto auc) throws Exception {
				
		return aucMapper.tryAuction(auc);
		
	}
	
	public void cancelAuction(AuctionDto auc) throws Exception {
		
		aucMapper.cancelAuction(auc);
	}
	
}
