package auction.guad.service;

import auction.guad.vo.RequestTradeVo;

public interface SellItemResultService {
	
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception;
	public RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;

}
