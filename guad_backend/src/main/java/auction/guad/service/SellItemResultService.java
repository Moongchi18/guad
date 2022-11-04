package auction.guad.service;

import java.util.List;

import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;

public interface SellItemResultService {
	
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception;
	public RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;

	public void selectMySellList(RequestTradeVo item) throws Exception;
    public List<SellItemResultDto> selectMyBuyList(String memberEmail) throws Exception;
}
