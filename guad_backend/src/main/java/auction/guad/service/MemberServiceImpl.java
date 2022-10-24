package auction.guad.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import auction.guad.dto.MemberDto;
import auction.guad.mapper.MemberMapper;

@Service
public class MemberServiceImpl implements MemberService{
	
	private MemberMapper memberMapper;
	@Autowired
	public MemberServiceImpl(MemberMapper memberMapper) {
		super();
		this.memberMapper = memberMapper;
	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDto member = null;
		try {
			member = memberMapper.selectMemberDetailByEmail(username);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(member == null) {
			throw new UsernameNotFoundException(username);
		}
		return new User(member.getEmail(), member.getPass(), true, true, true, true, new ArrayList<>());
	}


	@Override
	public ArrayList<MemberDto> selectMemberListExceptPass() throws Exception {
		return memberMapper.selectMemberListExceptPass();
	}


	@Override
	public int insertMember(MemberDto memberDto) throws Exception {
		return memberMapper.insertMember(memberDto);
	}


	@Override
	public MemberDto selectMemberDetailByEmail(String email) throws Exception {
		return memberMapper.selectMemberDetailByEmail(email);
	}


	@Override
	public void updateMemberByEmail(MemberDto memberDto) throws Exception {
		memberMapper.updateMemberByEmail(memberDto);
	}

	
//	실제 삭제가 아니라 deleteYn 값 y로 변경
	@Override
	public void deleteMemberByEmail(MemberDto memberDto) throws Exception {
		memberMapper.deleteMemberByEmail(memberDto);
	}


}
