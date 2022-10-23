package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.ImgDto;
import auction.guad.service.ImgService;
import auction.guad.service.ImgServiceImpl;

@RestController
public class ImgController {

	@Autowired
	private ImgService imgService;
	
	
	@RequestMapping(value="/img", method=RequestMethod.GET)
	public List<ImgDto> allImgByItemNum(int itemNum) throws Exception {
		return imgService.allImgByItemNum(itemNum);
	}
	
	@RequestMapping(value="/img/insert/S", method=RequestMethod.POST)
	public void insertSellImg(@RequestBody ImgDto imgDto) throws Exception {
		imgService.insertSellImg(imgDto);
	}
	
	@RequestMapping(value="/img/insert/R", method=RequestMethod.POST)
	public void insertReviewImg(@RequestBody ImgDto imgDto) throws Exception {
		imgService.insertReviewImg(imgDto);
	}
			
	@RequestMapping(value="/img/{itemImgNum}", method=RequestMethod.PATCH)
	public void deleteImg(@PathVariable("itemImgNum") int itemImgNum, @RequestBody ImgDto imgDto) throws Exception {
		imgDto.setItemImgNum(itemImgNum);
		imgService.deleteImg(itemImgNum);
	}

	
}
