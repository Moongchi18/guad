package auction.guad.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import auction.guad.dto.MemberDto;
import auction.guad.mapper.MemberMapper;
import auction.guad.security.PrincipalDetails;

@Service
public class MemberServiceImpl implements MemberService {

	private MemberMapper memberMapper;
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	public MemberServiceImpl(MemberMapper memberMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.memberMapper = memberMapper;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		MemberDto member = memberMapper.loginContainPass(username);
		System.out.println("<<<<<<<<<<<<<<<<<<<<<<loadUserByUsername" + member);

		Collection<GrantedAuthority> collect = new ArrayList<>();
		collect.add(new GrantedAuthority() {
			@Override
			public String getAuthority() {
				return member.getManagerYn();
			}
		});
	
		
		if (member == null) {
			throw new UsernameNotFoundException(username);
		}
		return new User(member.getEmail(), member.getPass(), true, true, true, true, collect);
	}

	@Override
	public ArrayList<MemberDto> managerSelectMemberListExceptPass() throws Exception {
		return memberMapper.managerSelectMemberListExceptPass();
	}

	@Override
	public int insertMember(MemberDto memberDto) throws Exception {
		memberDto.setPass(bCryptPasswordEncoder.encode(memberDto.getPass()));
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

	@Override
	public ArrayList<MemberDto> managerSelectMemberListExceptPassAndDeleted() throws Exception {
		return memberMapper.managerSelectMemberListExceptPassAndDeleted();
	}

	@Override
	public MemberDto managerSelectMemberDetailByEmail(String email) throws Exception {
		return memberMapper.managerSelectMemberDetailByEmail(email);
	}

	@Override
	public MemberDto loginContainPass(String email) {
		return memberMapper.loginContainPass(email);
	}

}
