package auction.guad.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.MemberDto;

@Mapper
public interface MemberMapper {
	
	ArrayList<MemberDto> selectMemberListExceptPass() throws Exception;
	int insertMember(MemberDto memberDto) throws Exception;
	MemberDto selectMemberDetailByEmail(String email) throws Exception;
	void updateMemberByEmail(MemberDto memberDto) throws Exception;
	void deleteMemberByEmail(MemberDto memberDto) throws Exception;

}
