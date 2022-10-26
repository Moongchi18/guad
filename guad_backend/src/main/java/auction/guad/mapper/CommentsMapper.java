package auction.guad.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.CommentsDto;

@Mapper
public interface CommentsMapper {

List<CommentsDto> commentsListByEmail() throws Exception;
int insertComment(CommentsDto commentsDto) throws Exception;
CommentsDto selectCommentDetail(int commentNum) throws Exception;
void updateComment(CommentsDto commentsDto) throws Exception;
void deleteComment(CommentsDto commentsDto) throws Exception;
	
}
