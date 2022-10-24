package auction.guad.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import auction.guad.dto.ReviewDto;
import auction.guad.mapper.ReviewMapper;

public class ReviewServiceImpl implements ReviewService{

	
	@Autowired
	private ReviewMapper reviewMapper;
	
	public List<ReviewDto> reviewList() throws Exception {
		return reviewMapper.reviewList();		
	}
	
	public int insertReview(ReviewDto reviewDto) throws Exception {
		return reviewMapper.insertReview(reviewDto);
		
	}
	
	
	public ReviewDto selectReviewDetail(int reviewNum) throws Exception {
		return reviewMapper.selectReviewDetail(reviewNum);
		
	}
	
	public void updateReview(ReviewDto reviewDto) throws Exception {
		    reviewMapper.updateReview(reviewDto);
		
	}
	
	public void deleteReview(int reviewNum) throws Exception {
			reviewMapper.deleteReview(reviewNum);
	}

	
}
