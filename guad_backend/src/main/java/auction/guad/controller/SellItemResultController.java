package auction.guad.controller;

import java.util.ArrayList;
import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.ImgDto;
import auction.guad.dto.MemberDto;
import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.service.ImgService;
import auction.guad.service.MemberService;
import auction.guad.service.SellItemResultService;
import auction.guad.service.SellItemService;
import auction.guad.vo.RequestTradeVo;
import auction.guad.vo.SellItemJoinMemberVo;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SellItemResultController {

    final private SellItemResultService sellItemResultService;
    final private SellItemService sellItemService;
    final private MemberService memberService;
    private ImgService imgService;
    /////////////////////////////////////////////////////////////////////////////

    @ApiOperation(value = "거래 결과(SellItemResultDto)", notes = "모든 상품 거래 결과 입력, 파라미터 : SellItemResultDto")
    @PostMapping("/sell")
    public ResponseEntity<Boolean> insertResult(@RequestBody RequestTradeVo requestTrade,
            @AuthenticationPrincipal User user) throws Exception {
        SellItemJoinMemberVo sellItem = sellItemService.selectSellItemDetailNoHitCnt(requestTrade.getItemNum());

        requestTrade.setBuyerEmail(user.getUsername());
        requestTrade.setSellerEmail(sellItem.getMemberEmail());
        
        MemberDto seller = memberService.selectMemberDetailByEmail(requestTrade.getSellerEmail());
        MemberDto buyer = memberService.selectMemberDetailByEmail(requestTrade.getBuyerEmail());
        
        System.out.println("ggggggggggggggg" + seller);
        System.out.println("ggggggggggggggg" + buyer);
        System.out.println(seller==buyer);
        if (seller.getEmail().equals(buyer.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } else {
            
        requestTrade.setBuyerPhone(buyer.getPhone());
        requestTrade.setSellerPhone(seller.getPhone());
        
        System.out.println("tttttttttttttttttttttttttttttt" + requestTrade);
        boolean result = sellItemResultService.normalTrade(requestTrade);
        return ResponseEntity.status(HttpStatus.OK).body(null);
        
        }
        
}
        

    @ApiOperation(value = "거래결과 조회(buyerEmail)", notes = "buyerEmail을 기준으로 거래결과 조회, 파라미터 : buyerEmail")
    @GetMapping("/sell/{itemNum}")
    public ResponseEntity<RequestTradeVo> selectTradeResult(@PathVariable int itemNum,
            @AuthenticationPrincipal User user) throws Exception {
        RequestTradeVo requestVo = sellItemResultService.selectOneByBuyerEmailAndItemNum(user.getUsername(), itemNum);
        System.out.println(requestVo);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(requestVo);
        }
    }

    @ApiOperation(value = "구매내역 조회", notes = "마이페이지에서 내 email로 구매내역 조회")
    @RequestMapping(value = "/buylist", method = RequestMethod.GET)
    public List<SellItemResultDto> selectMyBuyList(@AuthenticationPrincipal User user)
            throws Exception {
        List<SellItemResultDto> list = sellItemResultService.selectMyBuyList(user.getUsername());
        List<ImgDto> ImgList = new ArrayList<>();
        return list;
    }
    
    @ApiOperation(value = "판매 조회", notes = "마이페이지에서 내 판매내역 조회")
    @RequestMapping(value = "/selllist", method = RequestMethod.GET)
    public List<SellItemDto> selectMySellList(@AuthenticationPrincipal User user)
            throws Exception {
        List<SellItemDto> list2 = sellItemResultService.selectMySellList(user.getUsername());
        List<ImgDto> ImgList = new ArrayList<>();
        System.out.println("list2>>>>>>>>>>>>>>>>>>>:" + list2);
        return list2;
    }
    
    

}
