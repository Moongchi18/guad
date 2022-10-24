package auction.guad.service;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetailsService;

import auction.guad.dto.MemberDto;

public interface MemberService extends UserDetailsService{
	
	public ArrayList<MemberDto> selectMemberListExceptPass() throws Exception;
	public int insertMember(MemberDto memberDto) throws Exception;
	public MemberDto selectMemberDetailByEmail(String email) throws Exception;
	public void updateMemberByEmail(MemberDto memberDto) throws Exception;
	public void deleteMemberByEmail(MemberDto memberDto) throws Exception;

}
