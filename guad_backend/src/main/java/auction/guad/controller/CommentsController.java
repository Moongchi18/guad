package auction.guad.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.CommentsDto;
import auction.guad.service.CommentsService;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
public class CommentsController {

	@Autowired
	private CommentsService commentsService;
	
	@ApiOperation(value = "댓글 목록 조회", notes = "등록된 댓글 목록을 조회")
	@RequestMapping(value = "/comments", method = RequestMethod.GET)
	public List<CommentsDto> opencommentsList() throws Exception {
		return commentsService.commentsListByEmail();
	}

	@ApiOperation(value = "댓글 등록", notes = "댓글 제목과 내용을 저장")
	@RequestMapping(value = "/comments", method = RequestMethod.POST)
	public void insertComment(
			@Parameter(description = "댓글 정보", required = true, example = "{ title: 제목, contents: 내용 }") @RequestBody CommentsDto comments)
			throws Exception {
		commentsService.insertComment(comments);
	}

	@ApiOperation(value = "댓글 상세 조회", notes = "등록된 댓글 상세 정보를 조회")
	@RequestMapping(value = "/comments/{commentNum}", method = RequestMethod.GET)
	public ResponseEntity<CommentsDto> openCommentDetail(
			@Parameter(description = "댓글 번호", required = true, example = "1") @PathVariable("commentNum") int commentNum)
			throws Exception {
		CommentsDto commentsDto = commentsService.selectCommentDetail(commentNum);
		if (commentsDto == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
		} else {
			// return ResponseEntity.status(HttpStatus.OK).body(commentsDto);
			return ResponseEntity.ok(commentsDto);
		}
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


