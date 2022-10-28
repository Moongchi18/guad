package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.SellItemDto;
import auction.guad.service.SellItemService;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class SellItemController {

	@Autowired
	private SellItemService sellItemService;
	
	@ApiOperation(value = "목록 조회", notes = "등록된 게시물 목록을 조회")
	@RequestMapping(value = "/sellitem", method = RequestMethod.GET)
	public List<SellItemDto> openSellItemList() throws Exception {
		return sellItemService.sellItemList();
	}

	@ApiOperation(value = "게시물 등록", notes = "게시물 제목과 내용을 저장")
	@RequestMapping(value = "/sellitem", method = RequestMethod.POST)
	public ResponseEntity<Boolean> insertSellItem(
			@Parameter(description = "게시물 정보", required = true, example = "{ title: 제목, contents: 내용 }") 
			@RequestBody SellItemDto sellItem, @AuthenticationPrincipal User user)
			throws Exception {
		System.out.println(user);
		System.out.println("<<<<<<<<<" +sellItem);
		System.out.println("<<<<<<<<<" +sellItem.getAPeriod());
//		boolean result = sellItemService.insertSellItem(sellItem);
//		if(result) {
//			return ResponseEntity.status(HttpStatus.OK).body(result);
//		} else {
//			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
//		}
		return ResponseEntity.status(HttpStatus.OK).body(null);
	}

	@ApiOperation(value = "게시물 상세 조회", notes = "등록된 게시물 상세 정보를 조회")
	@RequestMapping(value = "/sellitem/{itemNum}", method = RequestMethod.GET)
	public ResponseEntity<SellItemDto> openSellItemDetail(
			@Parameter(description = "게시물 번호", required = true, example = "1") @PathVariable("itemNum") int itemNum)
			throws Exception {
		SellItemDto sellItemDto = sellItemService.selectSellItemDetail(itemNum);
		if (sellItemDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			// return ResponseEntity.status(HttpStatus.OK).body(sellItemDto);
			return ResponseEntity.ok(sellItemDto);
		}
	}

	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.PUT)
	public void updateSellItem(@PathVariable("itemNum") int itemNum, @RequestBody SellItemDto sellItemDto) throws Exception {
		sellItemDto.setItemNum(itemNum);
		sellItemService.updateSellItem(sellItemDto);
	}

	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.DELETE)
	public void deleteSellItem(@PathVariable("itemNum") int itemNum) throws Exception {
		sellItemService.deleteSellItem(itemNum);
	}
}


