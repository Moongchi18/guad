package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;

@Mapper
public interface SellItemResultMapper {
	
	int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;

}
