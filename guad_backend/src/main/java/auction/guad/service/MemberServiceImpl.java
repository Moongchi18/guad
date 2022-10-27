package auction.guad.service;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import auction.guad.dto.MemberDto;
import auction.guad.mapper.MemberMapper;
import auction.guad.security.PrincipalDetails;

@Service
//public class MemberServiceImpl extends DefaultOAuth2UserService  implements MemberService {
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

		if (member == null) {
			throw new UsernameNotFoundException(username);
		}
		return new User(member.getEmail(), member.getPass(), true, true, true, true, new PrincipalDetails(member).getAuthorities());
	}
	
//	@Override
//	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//		System.out.println(userRequest);
//		return super.loadUser(userRequest);
//	}

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
	public ArrayList<MemberDto> managerSelectMemberListExceptPassAnddelete() throws Exception {
		return memberMapper.managerSelectMemberListExceptPassAnddelete();
	}

	@Override
	public MemberDto managerSelectMemberDetailByEmail(String email) throws Exception {
		return memberMapper.managerSelectMemberDetailByEmail(email);
	}

	@Override
	public MemberDto loginContainPass(String email) {
		return memberMapper.loginContainPass(email);
	}

	@Override
	public int repetitionEmailCheck(String email) throws Exception {
		return memberMapper.repetitionEmailCheck(email);
	}

	@Override
	public int repetitionNicknameCheck(String nickname) throws Exception {
		return 0;
	}

}
