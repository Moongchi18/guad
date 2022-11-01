package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemDto;

@Mapper
public interface SellItemMapper {

 List<SellItemDto> sellItemList() throws Exception;
 int insertSellItem(SellItemDto sellItemDto) throws Exception;
 SellItemDto selectSellItemDetail(int itemNum) throws Exception;
 void updateSellItem(SellItemDto sellItemDto) throws Exception;
 void deleteSellItem(int itemNum) throws Exception;
 
 int selectAllItemCount() throws Exception;
 int selectItemTypeCount(String itemType) throws Exception;

	
}
