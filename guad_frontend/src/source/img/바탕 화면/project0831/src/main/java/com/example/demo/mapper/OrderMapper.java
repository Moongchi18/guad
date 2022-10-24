package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import vo.BasketVo;
import vo.OrderVo;

public interface OrderMapper {

   
   public int insertBasket(BasketVo basket2);
   
   public int lastOrderNum();
   
   public int orderInsert(@Param("loginEmail") String loginEmail, @Param("orderNum")int orderNum, @Param("orderAddress")String orderAddress, @Param("orderList")String orderList);
   
   public int basketDelete();
   
   public List<OrderVo> getOrderList(String loginEmail);
   
   public List<OrderVo> getLastOrder(String loginEmail);
}