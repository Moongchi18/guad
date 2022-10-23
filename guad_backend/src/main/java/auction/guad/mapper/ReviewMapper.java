package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.ReviewDto;

@Mapper
public interface ReviewMapper {

	public List<ReviewDto> reviewList() throws Exception;
	public int insertReview(ReviewDto reviewDto) throws Exception;
	public ReviewDto selectReviewDetail(int reviewNum) throws Exception;
	public void updateReview(ReviewDto reviewDto) throws Exception;
	public void deleteReview(int reviewNum) throws Exception;
}
