package auction.guad.service;

import java.util.ArrayList;

import auction.guad.dto.MemberDto;
import auction.guad.dto.NotifyDto;

public interface NotifyService  {
	
	public int insertNotify(NotifyDto notifyDto) throws Exception;
	public ArrayList<NotifyDto> notifyList() throws Exception;
	public NotifyDto notifyDetail(String notifyNum) throws Exception;
}
