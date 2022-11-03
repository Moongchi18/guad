package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.PageDto;
import auction.guad.dto.SellItemDto;
import auction.guad.service.SellItemService;
import auction.guad.vo.SellItemJoinMemberVo;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class SellItemController {

	private SellItemService sellItemService;
	
	@Autowired
	public SellItemController(SellItemService sellItemService) {
		this.sellItemService = sellItemService;
	}

	@ApiOperation(value = "상품 전체 조회()", notes = "상품 전체 목록을 조회, 파라미터 : ''")
	@GetMapping("/sellitem")
	public PageDto openSellItemList(@RequestParam(defaultValue="1")int page) throws Exception {
		return sellItemService.selectSellItemList(page);
	}
	

	@ApiOperation(value = "상품 등록(SellItemDto)", notes = "게시물 제목과 내용을 저장, 파라미터 : SellItemDto")
	@PostMapping("/sellitem")
	public ResponseEntity<Boolean> insertSellItem(
			@Parameter(description = "게시물 정보", required = true, example = "{ title: 제목, contents: 내용 }") @RequestBody SellItemDto sellItem,
			@AuthenticationPrincipal User user) throws Exception {
		sellItem.setMemberEmail(user.getUsername());
		System.out.println("minPrice>>>>>>>>>>>>>>>>>>>" + sellItem.getAuctionMinPrice());
		boolean result = sellItemService.insertSellItem(sellItem);
		if (result) {
			return ResponseEntity.status(HttpStatus.OK).body(result);
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(result);
		}
	}
	
	

	@ApiOperation(value = "게시물 상세 조회", notes = "등록된 게시물 상세 정보를 조회")
	@RequestMapping(value = "/sellitem/{itemNum}", method = RequestMethod.GET)
	public ResponseEntity<SellItemJoinMemberVo> openSellItemDetail(
			@Parameter(description = "게시물 번호", required = true, example = "1") @PathVariable("itemNum") int itemNum)
			throws Exception {
		SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetail(itemNum);
		System.out.println(sellItem);
		if (sellItem == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			sellItem.setMemberEmail(" ");
			// return ResponseEntity.status(HttpStatus.OK).body(sellItemDto);
			return ResponseEntity.status(HttpStatus.OK).body(sellItem);
		}
	}

	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.PUT)
	public void updateSellItem(@PathVariable("itemNum") int itemNum, @RequestBody SellItemDto sellItemDto)
			throws Exception {
		sellItemDto.setItemNum(itemNum);
		sellItemService.updateSellItem(sellItemDto);
	}

	@RequestMapping(value = "/sellItem/{itemNum}", method = RequestMethod.DELETE)
	public void deleteSellItem(@PathVariable("itemNum") int itemNum) throws Exception {
		sellItemService.deleteSellItem(itemNum);
	}
}
