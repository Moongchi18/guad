package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemDto;

@Mapper
public interface SellItemMapper {

	public List<SellItemDto> sellItemList() throws Exception;
	public int insertSellItem(SellItemDto sellItemDto) throws Exception;
	public SellItemDto selectSellItemDetail(int itemNum) throws Exception;
	public void updateSellItem(SellItemDto sellItemDto) throws Exception;
	public void deleteSellItem(int itemNum) throws Exception;

	
}
