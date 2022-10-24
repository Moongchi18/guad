package com.example.demo.repository;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.mapper.OrderMapper;

import vo.BasketVo;
import vo.OrderVo;

@Component
public class OrderDao {
	@Autowired
	private SqlSessionTemplate session;

	public int insertBasket(BasketVo basket2) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.insertBasket(basket2);

	}

	public int lastOrderNum() {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.lastOrderNum();
	}
	
	public int orderInsert(String loginEmail, int orderNum, String orderAddress, String orderList) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.orderInsert(loginEmail, orderNum, orderAddress, orderList);
	}
	
	public int basketDelete() {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.basketDelete();
	}
	
	public List<OrderVo> getOrderList(String loginEmail) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.getOrderList(loginEmail);
	}
	
	public List<OrderVo> getLastOrder(String loginEmail) {
		OrderMapper mapper = session.getMapper(OrderMapper.class);
		return mapper.getLastOrder(loginEmail);
	}
	
}