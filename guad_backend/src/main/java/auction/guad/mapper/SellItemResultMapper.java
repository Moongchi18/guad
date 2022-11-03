package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;

@Mapper
public interface SellItemResultMapper {
	
	int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	SellItemResultDto selectOneByBuyerEmail(String buyerEmail) throws Exception;

}
