package auction.guad.mapper;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.NotifyDto;

@Mapper
public interface NotifyMapper {

	int insertNotify(NotifyDto notify) throws Exception;

}
