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

import auction.guad.dto.ReviewDto;
import auction.guad.service.ReviewService;

import io.swagger.annotations.ApiOperation;
import io.swagger.v3.oas.annotations.Parameter;

@RestController
@RequestMapping("/api/review")
public class ReviewController {

	@Autowired
	private ReviewService reviewService;
	
	@ApiOperation(value = "리뷰 목록 조회", notes = "등록된 리뷰 목록을 조회")
	@RequestMapping(value = "/review", method = RequestMethod.GET)
	public List<ReviewDto> openReviewList() throws Exception {
		return reviewService.reviewList();
	}

	@ApiOperation(value = "리뷰 등록", notes = "리뷰 제목과 내용을 저장")
	@RequestMapping(value = "/review", method = RequestMethod.POST)
	public void insertReview(
			@Parameter(description = "리뷰 정보", required = true, example = "{ title: 제목, contents: 내용 }") @RequestBody ReviewDto review)
			throws Exception {
		reviewService.insertReview(review);
	}
	

	@RequestMapping(value = "/review/{reviewNum}", method = RequestMethod.PUT)
	public void updateReview(@PathVariable("reviewNum") int reviewNum, @RequestBody ReviewDto reviewDto) throws Exception {
		reviewDto.setReviewNum(reviewNum);
		reviewService.updateReview(reviewDto);
	}

	@RequestMapping(value = "/Review/{reviewNum}", method = RequestMethod.DELETE)
	public void deleteReview(@PathVariable("reviewNum") int reviewNum) throws Exception {
		reviewService.deleteReview(reviewNum);
	}
}


