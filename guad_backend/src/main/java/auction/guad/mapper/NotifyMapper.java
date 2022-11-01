package auction.guad.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.NotifyDto;

@Mapper
public interface NotifyMapper {

	int insertNotify(NotifyDto notify) throws Exception;
	ArrayList<NotifyDto> notifyList() throws Exception;
	NotifyDto notifyDetail(String notifyNum) throws Exception;

}
