package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.SellItemDto;
import auction.guad.mapper.SellItemMapper;

@Service
public class SellItemServiceImpl implements SellItemService{
	
	@Autowired
	private SellItemMapper sellItemMapper;
	
	public List<SellItemDto> sellItemList() throws Exception {
		return sellItemMapper.sellItemList();		
	}
	
	public boolean insertSellItem(SellItemDto sellItemDto) throws Exception {
		int result = sellItemMapper.insertSellItem(sellItemDto);
		if(result==1) {
			return true;
		} else {
			return false;			
		}
		
	}
	
	
	public SellItemDto selectSellItemDetail(int itemNum) throws Exception {
		return sellItemMapper.selectSellItemDetail(itemNum);
		
	}
	
	public void updateSellItem(SellItemDto sellItemDto) throws Exception {
		    sellItemMapper.updateSellItem(sellItemDto);
		
	}
	
	public void deleteSellItem(int itemNum) throws Exception {
			sellItemMapper.deleteSellItem(itemNum);
	}

}
