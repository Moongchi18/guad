package auction.guad.service;

import java.util.List;

import auction.guad.dto.PageDto;
import auction.guad.dto.SellItemDto;
import auction.guad.vo.SellItemJoinMemberVo;

public interface SellItemService {

	public List<SellItemDto> sellItemList() throws Exception;
	public boolean insertSellItem(SellItemDto sellItemDto) throws Exception;
	public SellItemJoinMemberVo selectSellItemDetail(int itemNum) throws Exception;
	public void updateSellItem(SellItemDto sellItemDto) throws Exception;
	public void deleteSellItem(int itemNum) throws Exception;

	public int selectAllItemCount() throws Exception;
	public int selectItemTypeCount(String itemType) throws Exception;
	int selectSellTypeCount(String sellType) throws Exception;
	int selectSellTypeItemTypeCount(String sellType, String itemType) throws Exception;
	
	PageDto selectSellItemList(int currentPage) throws Exception;
	public int updateSoldYn(int itemNum) throws Exception;
}
