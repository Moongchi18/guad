package com.example.demo.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.CustomerService;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;

import vo.BasketVo;
import vo.CustomerVo;

@Controller
public class OrderController {

	@Autowired
	private ProductService service1;

	@Autowired
	private CustomerService service2;

	@Autowired
	private OrderService service3;

	@RequestMapping("orderFail")
	public String orderFail() {
		return "order/order_fail";
	}

	@RequestMapping("burgerOrderForm")
	public ModelAndView burgerOrderForm(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		String loginEmail = (String) session.getAttribute("loginEmail");

		if (loginEmail == null) {
			mv.setViewName("order/order_fail");
		} else {

			mv.addObject("email", session.getAttribute("loginEmail"));
			mv.addObject("count", service1.productBurger().size());
			mv.addObject("productBurger", service1.productBurger());
			mv.setViewName("order/burger_order_form");
		}
		return mv;
	}

	@RequestMapping("sideOrderForm")
	public ModelAndView sideOrderForm(String basket) {

		System.out.println("TEST : " + basket);

		ModelAndView mv = new ModelAndView();
		mv.addObject("basket", basket);
		mv.addObject("count", service1.productSide().size());
		mv.addObject("productSide", service1.productSide());
		mv.setViewName("order/side_order_form");
		return mv;

	}

	@RequestMapping("drinkOrderForm")
	public ModelAndView drinkOrderForm(String basket) {

		System.out.println("TEST : " + basket);

		ModelAndView mv = new ModelAndView();
		mv.addObject("basket", basket);
		mv.addObject("count", service1.productDrink().size());
		mv.addObject("productDrink", service1.productDrink());
		mv.setViewName("order/drink_order_form");
		return mv;
	}

	@RequestMapping("deliveryOrderForm")
	public ModelAndView deliveryOrderForm(String basket, HttpSession session) {

		BasketVo basket2 = new BasketVo();
		ModelAndView mv = new ModelAndView();
		// 주문 반복수
		int count = 0;

		String loginEmail = (String) session.getAttribute("loginEmail");
		CustomerVo customer = service2.getCustomerInfo(loginEmail);

		basket = basket.replaceAll("[^0-9,]", "");
		System.out.println("TEST : " + basket);

		mv.addObject("orderList", basket);

		String[] basketArray = basket.split(",");

		for (int i = 0; i < basketArray.length; i += 2) {
			count += 1;
			String basketProduct = (String) basketArray[i];
			String basketProductNum = (String) basketArray[i + 1];

			basket2.setBasketProduct(basketProduct);
			basket2.setBasketProductNum(basketProductNum);

			service3.insertBasket(basket2);
		}

		System.out.println(count);
		// 장바구니 전부 가져오기

		mv.addObject("basket", service1.basketAll());
		mv.addObject("count", count);
		mv.addObject("phone", customer);
		mv.setViewName("order/delivery_order_form");
		return mv;
	}

	@RequestMapping(value = "order", method = RequestMethod.POST)
	public ModelAndView order(@RequestParam("orderAddress") String orderAddress, @RequestParam("totalpay") int tp,
			@RequestParam("orderList") String orderList, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		System.out.println("ad : s" + orderAddress + " / " + tp + " / " + "orderList : " +orderList);

		String loginEmail = (String) session.getAttribute("loginEmail");
		int lastOrderNumBefore = service3.lastOrderNum();
		int orderNum = lastOrderNumBefore + 1;
		System.out.println(lastOrderNumBefore);
		
		int totalPayBefore = service2.totalPay(loginEmail);
		System.out.println(totalPayBefore);
		
		int totalPay = totalPayBefore + tp;
		System.out.println(totalPay);
		service2.totalPayUpdate(totalPay, loginEmail);
		
		service3.orderInsert(loginEmail, orderNum, orderAddress, orderList);
		service3.basketDelete();
		mv.setViewName("order/order_success");
		return mv;
		
	}
	
	
}