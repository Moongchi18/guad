package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import vo.CustomerVo;

public interface CustomerMapper {

	/* 회원가입 */
	public int insert(CustomerVo customer);

	/* 회원정보 조회(가져오기) */
	public CustomerVo selectCustomer(String email);

	/* 로그인 성공/실패 */
	public int selectCustomerNum(@Param("email") String email, @Param("password") String password);

	/* 회원정보 수정(업데이트) */
	public int update(CustomerVo customer);

	//모든 회원 조회 
	public List<CustomerVo> selectAllCustomer();
	
	//총금액 가져오기
	public int totalPay(String loginEmail);
	
	//총금액 입력
	public int totalPayUpdate(@Param("totalPay") int totalPay, @Param("loginEmail") String loginEmail);
}
