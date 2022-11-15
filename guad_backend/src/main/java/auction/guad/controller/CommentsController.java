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

import auction.guad.dto.CommentsDto;
import auction.guad.dto.MemberDto;
import auction.guad.service.CommentsService;
import auction.guad.service.MemberService;
import auction.guad.service.ReviewService;
import auction.guad.service.SellItemService;
import auction.guad.vo.SellItemJoinMemberVo;
import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class CommentsController {

    private MemberService memberService;   
    private SellItemService sellItemService;
    private CommentsService commentsService;
        
    @Autowired
    public CommentsController(MemberService memberService, CommentsService commentsService, SellItemService sellItemService) {
        this.memberService = memberService;     
        this.commentsService = commentsService;
        this.sellItemService = sellItemService;
    }
	
	@ApiOperation(value = "댓글 목록 조회", notes = "등록된 댓글 목록을 조회")
	@RequestMapping(value = "/comments/{itemNum}", method = RequestMethod.GET)
	public List<CommentsDto> commentsList(@PathVariable ("itemNum")int itemNum) throws Exception {
		
	       List<CommentsDto> comments = commentsService.commentsListByItemNum(itemNum);        
	       
	       return comments;
    }
	

	@ApiOperation(value = "댓글 등록", notes = "닉네임/내용 등록")
	@RequestMapping(value = "/comments", method = RequestMethod.POST)
	public void insertComment(
			@Parameter(description = "댓글 정보", required = true, example = "{ nickname: 닉네임, contents: 내용 }") @RequestBody CommentsDto comments , @AuthenticationPrincipal User user)
			throws Exception {
	    MemberDto member = memberService.selectMemberDetailByEmail(user.getUsername());
	    comments.setMemberEmail(member.getEmail());
	    comments.setWriterNickname(member.getNickname());
		commentsService.insertComment(comments);
		System.out.println("ddddddddddddddd"+ comments);
	}

	
	@RequestMapping(value = "/comment/{commentNum}", method = RequestMethod.PATCH)
	public void updateComment(@PathVariable("commentNum") int commentNum, @RequestBody CommentsDto commentsDto) throws Exception {
		commentsDto.setCommentNum(commentNum);
		commentsService.updateComment(commentsDto);
	}

	@RequestMapping(value = "/comments/{commentNum}", method = RequestMethod.PATCH)
	public void deleteComment(@PathVariable("commentNum") int commentNum, @RequestBody CommentsDto commentsDto) throws Exception {
		commentsService.deleteComment(commentsDto);
	}
}


