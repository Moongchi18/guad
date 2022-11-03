package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.SellItemResultDto;
import auction.guad.mapper.SellItemResultMapper;

@Service
public class SellItemResultServiceImpl implements SellItemResultService{
	
	private SellItemResultMapper sellItemResultMapper;
	@Autowired
	public SellItemResultServiceImpl(SellItemResultMapper sellItemResultMapper) {
		this.sellItemResultMapper = sellItemResultMapper;
	}
	
	///////////////////////////////////////////////////////////////////////////////
	
	@Override
	public int insertSellItemResult(SellItemResultDto sellItemResultDto) throws Exception {
		return sellItemResultMapper.insertSellItemResult(sellItemResultDto);
	}
}
