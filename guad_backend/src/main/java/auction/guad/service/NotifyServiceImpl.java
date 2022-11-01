package auction.guad.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.NotifyDto;
import auction.guad.mapper.NotifyMapper;

@Service
public class NotifyServiceImpl implements NotifyService{
	
	@Autowired
	NotifyMapper notifyMapper;
	
	public int insertNotify(NotifyDto notify) throws Exception {
		
		return notifyMapper.insertNotify(notify);
		
	}
}
