package auction.guad.service;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import auction.guad.dto.SellItemResultDto;
import auction.guad.mapper.SellItemResultMapper;
import auction.guad.vo.RequestMileageVo;
import auction.guad.vo.RequestTradeVo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellItemResultServiceImpl implements SellItemResultService{
	
	final private SellItemResultMapper sellItemResultMapper;
	final private MemberService memberService;
	final private MileageService mileageService;
	final private SellItemService sellItemService;
	///////////////////////////////////////////////////////////////////////////////
	
	@Override
	public int insertSellItemResult(RequestTradeVo requestTrade) throws Exception {
		return sellItemResultMapper.insertSellItemResult(requestTrade);
	}


	@Transactional
	@Override
	public boolean normalTrade(RequestTradeVo requestTrade) throws Exception {
		if(requestTrade.getMileage() - requestTrade.getItemPrice() < 0) {
			throw new Exception();
		} else if(requestTrade.getSoldYn() != 'n') {
			throw new Exception();
		}
		
		int result = sellItemResultMapper.insertSellItemResult(requestTrade);
		if(result == 1) {
			sellItemService.updateSoldYn(requestTrade.getItemNum());
			mileageService.useMileage(new RequestMileageVo(requestTrade.getBuyerEmail(), requestTrade.getItemPrice()));			
			return true;
		} else {
			return false;
		}
		
	}
}
