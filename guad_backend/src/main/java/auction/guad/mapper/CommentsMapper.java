package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.CommentsDto;

@Mapper
public interface CommentsMapper {

	public List<CommentsDto> commentsList() throws Exception;
	public int insertComment(CommentsDto commentsDto) throws Exception;
	public CommentsDto selectCommentDetail(int commentNum) throws Exception;
	public void updateComment(CommentsDto commentsDto) throws Exception;
	public void deleteComment(int commentNum) throws Exception;
}
