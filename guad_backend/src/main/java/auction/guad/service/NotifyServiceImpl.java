package auction.guad.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import auction.guad.dto.MemberDto;
import auction.guad.dto.NotifyDto;
import auction.guad.mapper.NotifyMapper;

@Service
public class NotifyServiceImpl implements NotifyService{
	
	@Autowired
	NotifyMapper notifyMapper;
	
	@Override
	public int insertNotify(NotifyDto notify) throws Exception {
		
		return notifyMapper.insertNotify(notify);
		
	}
	
	@Override
	public ArrayList<NotifyDto> notifyList()throws Exception {
		
		return notifyMapper.notifyList();
		
	}

	@Override
	public NotifyDto notifyDetail(String notifyNum) throws Exception {
		
		return notifyMapper.notifyDetail(notifyNum);
		
	}
	
}
