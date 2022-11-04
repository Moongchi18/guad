package auction.guad.service;

import java.util.List;
import auction.guad.dto.ImgDto;


public interface ImgService {

	public int insertSellImg(ImgDto imgDto) throws Exception;

	
	public ImgDto selectImgByItemImgNumFirst(int itemNum) throws Exception;
	public List<ImgDto> allImgByItemNum(int itemNum) throws Exception;
	public int deleteImg(int itemImgNum) throws Exception;
	
	
}
