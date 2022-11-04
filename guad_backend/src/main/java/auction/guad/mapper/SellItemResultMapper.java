package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.SellItemResultDto;
import auction.guad.vo.RequestTradeVo;

@Mapper
public interface SellItemResultMapper {
	
	int insertSellItemResult(RequestTradeVo requestTrade) throws Exception;
	RequestTradeVo selectOneByBuyerEmailAndItemNum(String buyerEmail, int itemNum) throws Exception;
	void selectMySellList(RequestTradeVo item) throws Exception;
	List<SellItemResultDto> selectMyBuyList(String memberEmail) throws Exception;

}
