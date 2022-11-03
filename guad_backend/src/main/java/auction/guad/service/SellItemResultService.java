package auction.guad.service;

import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;

public interface SellItemResultService {
	
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception;
	public SellItemResultDto selectOneByBuyerEmail(String buyerEmail) throws Exception;

}
