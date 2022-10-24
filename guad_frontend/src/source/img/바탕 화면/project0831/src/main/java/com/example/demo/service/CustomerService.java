package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Component;

import com.example.demo.repository.CustomerDao;

import vo.CustomerVo;

@Component
public class CustomerService {

	@Autowired
	private CustomerDao dao;

	public boolean join(CustomerVo customer) throws DuplicateKeyException {
		try {

			if (dao.insert(customer) > 0) {
				return true;
			} else {
				return false;
			}
		} catch (DuplicateKeyException e) {
			e.printStackTrace();
		}

		return false;
	}

	public CustomerVo getCustomerInfo(String loginEmail) {
		return dao.select(loginEmail);
	}

	public boolean login(String email, String password) {
		if (dao.selectCustomerNum(email, password) == 1) {
			return true;
		} else {
			return false;
		}
	}

	public boolean update(CustomerVo customer, String loginEmail) {

		if (loginEmail != null) {

			dao.update(customer);
			return true;
		} else {
			return false;
		}
	}

	public List<CustomerVo> selectAllCustomer() {
		return dao.selectAllCustomer();
	}
	
	public int totalPay(String loginEmail) {
		return dao.totalPay(loginEmail);
	}
	
	public int totalPayUpdate(int totalPay, String loginEmail) {
		return dao.totalPayUpdate(totalPay, loginEmail);
	}
	
	
}