package auction.guad.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MemberServiceImpl implements MemberService{
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		MemberDto member = findByEmail(username);
//		return new PrincipalDetails(member);
		return null;
	}

}
