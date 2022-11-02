package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.PageDto;
import auction.guad.dto.SellItemDto;
import auction.guad.mapper.SellItemMapper;
import auction.guad.vo.SellItemJoinMemberVo;

@Service
public class SellItemServiceImpl implements SellItemService {

	@Autowired
	private SellItemMapper sellItemMapper;

	private static final int COUNT_PER_PAGE = 12;

	public List<SellItemDto> sellItemList() throws Exception {
		return sellItemMapper.sellItemList();
	}

	@Override
	public boolean insertSellItem(SellItemDto sellItemDto) throws Exception {
		int result = sellItemMapper.insertSellItem(sellItemDto);
		if (result == 1) {
			return true;
		} else {
			return false;
		}

	}

	@Override
	public SellItemJoinMemberVo selectSellItemDetail(int itemNum) throws Exception {
		return sellItemMapper.selectSellItemDetail(itemNum);

	}

	@Override
	public void updateSellItem(SellItemDto sellItemDto) throws Exception {
		sellItemMapper.updateSellItem(sellItemDto);

	}

	@Override
	public void deleteSellItem(int itemNum) throws Exception {
		sellItemMapper.deleteSellItem(itemNum);
	}

	@Override
	public int selectAllItemCount() throws Exception {
		return sellItemMapper.selectAllItemCount();
	}

	@Override
	public int selectItemTypeCount(String itemType) throws Exception {
		return sellItemMapper.selectItemTypeCount(itemType);
	}

	@Override
	public int selectSellTypeCount(String sellType) throws Exception {
		return sellItemMapper.selectSellTypeCount(sellType);
	}

	@Override
	public int selectSellTypeItemTypeCount(String sellType, String itemType) throws Exception {
		return sellItemMapper.selectSellTypeItemTypeCount(sellType, itemType);
	}

	@Override
	public PageDto selectSellItemList(int currentPage) throws Exception {
		int totalCount;
//		if (sellType == null && itemType == null) {
//			totalCount = sellItemMapper.selectAllItemCount();
//		} else if (sellType != null && itemType == null) {
//			totalCount = sellItemMapper.selectSellTypeCount(sellType);
//		} else if (sellType == null && itemType != null) {
//			totalCount = sellItemMapper.selectItemTypeCount(itemType);
//		} else if (sellType != null && itemType != null) {
//			totalCount = sellItemMapper.selectSellTypeItemTypeCount(sellType, itemType);
//		} else {
//			throw new Exception();
//		}
		
		totalCount = sellItemMapper.selectAllItemCount();
		int totalPage = totalCount / COUNT_PER_PAGE;
		int startPage = (currentPage - 1) / 10 * 10 + 1;
		int endPage = startPage + 9;

		if (totalPage < endPage) {
			endPage = totalPage;
		}

		int startRow = (currentPage - 1) * COUNT_PER_PAGE;
		
		List<SellItemDto> itemList = sellItemMapper.selectSellItemList(startRow, COUNT_PER_PAGE);
		return new PageDto(itemList, currentPage, startPage, endPage, totalPage);
	}


}
