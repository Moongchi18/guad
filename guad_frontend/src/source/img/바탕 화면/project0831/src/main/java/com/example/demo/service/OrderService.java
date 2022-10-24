package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.repository.OrderDao;

import vo.BasketVo;
import vo.OrderVo;

@Component
public class OrderService {

   @Autowired
   private OrderDao dao;

   public int insertBasket(BasketVo basket2) {
      return dao.insertBasket(basket2);
   }
   // 마지막 오더 넘버 조회
   public int lastOrderNum() {
      return dao.lastOrderNum();
   }

   public int orderInsert(String loginEmail, int orderNum, String orderAddress, String orderList) {
	   return dao.orderInsert(loginEmail, orderNum, orderAddress, orderList);
   }
   
   public int basketDelete() {
	   return dao.basketDelete();
   }
   
   public List<OrderVo> getOrderList(String loginEmail) {
	   return dao.getOrderList(loginEmail);
   }
   
   public List<OrderVo> getLastOrder(String loginEmail) {
	   return dao.getLastOrder(loginEmail);
   }
}