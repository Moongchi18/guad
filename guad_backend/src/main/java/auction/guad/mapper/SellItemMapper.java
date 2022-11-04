package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemDto;
import auction.guad.vo.SellItemJoinMemberVo;

@Mapper
public interface SellItemMapper {

	List<SellItemDto> sellItemList() throws Exception;
	int insertSellItem(SellItemDto sellItemDto) throws Exception;
	SellItemJoinMemberVo selectSellItemDetail(int itemNum) throws Exception;
	void updateSellItem(SellItemDto sellItemDto) throws Exception;
	void deleteSellItem(int itemNum) throws Exception;
	int selectAllItemCount() throws Exception;
	Integer selectLastItemNum() throws Exception;
	int selectItemTypeCount(String itemType) throws Exception;
	int selectSellTypeCount(String sellType) throws Exception;
	int selectSellTypeItemTypeCount(String sellType, String itemType) throws Exception;
	List<SellItemDto> selectSellItemList(int startRow, int count) throws Exception;
	int updateSoldYn(int itemNum) throws Exception;
}
