package com.example.demo.repository;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.mapper.CustomerMapper;

import vo.CustomerVo;

@Component
public class CustomerDao {

	@Autowired
	private SqlSessionTemplate session;

	public int insert(CustomerVo member) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.insert(member);
	}

	public CustomerVo select(String email) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.selectCustomer(email);
	}

	public int selectCustomerNum(String email, String password) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.selectCustomerNum(email, password);
	}

	public int update(CustomerVo customer) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.update(customer);
	}

	public List<CustomerVo> selectAllCustomer() {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.selectAllCustomer();
	}
	public int totalPay(String loginEmail) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.totalPay(loginEmail);
	}
	
	public int totalPayUpdate(int totalPay, String loginEmail) {
		CustomerMapper mapper = session.getMapper(CustomerMapper.class);
		return mapper.totalPayUpdate(totalPay, loginEmail);
	}
}
