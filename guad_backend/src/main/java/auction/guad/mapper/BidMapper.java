package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import auction.guad.dto.BidDto;
import auction.guad.dto.SellItemDto;

public interface BidMapper {

//	int selectTotalCount(@Param("mno") long mno, @Param("pgvo") PagingVO pgvo); // 페이징을 위한 특정 회원의 전체 입찰 갯수
	int insert(BidDto bidDto); // 입찰하기
	List<BidDto> selectList(@Param("memberNum") int memberNum); // 특정 회원의 입찰 리스트
	int updateBidStatus(BidDto bidDto); // 경매 종료 후 입찰상태 변경
	BidDto selectMaxBid(SellItemDto itemDto);
	int updateBidStatusFail(int itemNum);
	int updateBidStatusSuccess(int bidNum);
	String selectBuyerNick(int itemNum);
	
}
