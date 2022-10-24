package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.ImgDto;

@Mapper
public interface ImgMapper {
	
	int insertSellImg(ImgDto imgDto) throws Exception;
	int insertReviewImg(ImgDto imgDto) throws Exception;
	ImgDto selectImgByItemImgNum(int itemImgNum) throws Exception;
	List<ImgDto> allImgByItemNum(int itemNum) throws Exception;
	int deleteImg(int itemImgNum) throws Exception;
	
	
}
