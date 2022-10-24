package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.ReviewDto;

@Mapper
public interface ReviewMapper {

 List<ReviewDto> reviewList() throws Exception;
 int insertReview(ReviewDto reviewDto) throws Exception;
 ReviewDto selectReviewDetail(int reviewNum) throws Exception;
 void updateReview(ReviewDto reviewDto) throws Exception;
 void deleteReview(int reviewNum) throws Exception;
	
}
