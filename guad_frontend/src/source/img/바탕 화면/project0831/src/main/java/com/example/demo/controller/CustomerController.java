package com.example.demo.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.CustomerService;
import com.example.demo.service.OrderService;
import com.example.demo.service.ProductService;

import vo.CustomerVo;
import vo.OrderVo;

@Controller
public class CustomerController {

	@Autowired
	private CustomerService service;

	@Autowired
	private OrderService service2;
	
	@Autowired
	private ProductService service3;

	@RequestMapping("joinForm")
	public String joinForm() {
		return "customer/join_form";
	}

	@RequestMapping("joinSuccess")
	public String joinSuccess() {
		return "customer/login_form";
	}

	@RequestMapping(value = "/join", method = RequestMethod.POST)
	public ModelAndView join(CustomerVo customer) throws ParseException {
		ModelAndView mv = new ModelAndView();

		String birth = customer.getYear() + "-" + customer.getMonth() + "-" + customer.getDay();
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date tempDate = format.parse(birth);
		customer.setBirth(tempDate);

		if (service.join(customer)) {
			mv.setViewName("customer/join_success");
		} else {
			mv.setViewName("customer/join_fail");
		}
		return mv;
	}

	@RequestMapping("logout")
	public ModelAndView logout(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		session.setAttribute("loginEmail", null);

		mv.setViewName("customer/login_form");
		return mv;
	}

	@RequestMapping("loginForm")
	public String loginForm() {
		return "customer/login_form";
	}

	@RequestMapping("loginSuccess")
	public ModelAndView header(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		String loginEmail = (String) session.getAttribute("loginEmail");
		if (loginEmail.equals("s5s5z@naver.com")) {
			mv.setViewName("manager/manager_form");
		} else {
			mv.addObject("email", session.getAttribute("loginEmail"));
			mv.setViewName("index");
		}
		return mv;
	}

	@RequestMapping("loginFail")
	public String loginFail() {
		return "customer/login_form";
	}

	@RequestMapping("/login")
	public ModelAndView login(String email, String password, HttpSession session) {
		ModelAndView mv = new ModelAndView();

		if (service.login(email, password)) {
			session.setAttribute("loginEmail", email);

			mv.setViewName("customer/login_success");
		} else {
			mv.setViewName("customer/login_fail");
		}
		return mv;
	}

	// 우종
	@RequestMapping(value = "/mypageUpdate", method = RequestMethod.POST)
	public ModelAndView updateMy(CustomerVo customer, HttpSession session) {
		ModelAndView mv = new ModelAndView();
		String loginEmail = (String) session.getAttribute("loginEmail");
		customer.setEmail(loginEmail);
		boolean result = service.update(customer, loginEmail);

		if (result) {
			mv.setViewName("customer/mypage_update_success");
		} else {
			mv.setViewName("customer/mypage_update_fail");
		}
		return mv;
	}

	@RequestMapping("/mypageUpdateForm")
	public ModelAndView mypageUpdateForm(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		String loginEmail = (String) session.getAttribute("loginEmail");
		CustomerVo customer = service.getCustomerInfo(loginEmail);
		mv.addObject("original", customer);
		mv.setViewName("customer/mypage_update_form");
		return mv;
	}

	@RequestMapping("mypageForm")
	public ModelAndView mypageForm(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		String loginEmail = (String) session.getAttribute("loginEmail");
		
		List<OrderVo> orderListArray = service2.getLastOrder(loginEmail);
		//상목
		HashMap<Integer, String[]> map = new HashMap<>();
		// 상품 품목수
		List<Integer> countList = new ArrayList<Integer>();
		
	
		for (int i = 0; i < orderListArray.size(); i++) {
			int count = 0;
			
			String orderList = orderListArray.get(i).getOrderList();

			String[] orderArray = orderList.split(",");
			map.put(i, orderArray);
			
			for (int j = 0; j < orderArray.length; j +=2) {
				count += 1;	
			}
			count -= 1;
			countList.add(count);
		}

		//상품이름 불러오기
		Map<Integer, Object> map2 = new HashMap<>();
		for (int i=0; i<orderListArray.size(); i++) {
			map2.put(i, service3.productName(map.get(i)[0]));
			System.out.println(service3.productName(map.get(i)[0]));
		}
		
		
		if (loginEmail.equals("s5s5z@naver.com")) {
			mv.setViewName("manager/manager_form");
		} else {
			//최근 주문내역 추가
			mv.addObject("productCount",countList);
			mv.addObject("productName", map2);
			mv.addObject("orderInfo", service2.getLastOrder(loginEmail));
			
			mv.addObject("email", session.getAttribute("loginEmail"));
			mv.addObject("info", service.getCustomerInfo(loginEmail));
			mv.addObject("totalPay", service.totalPay(loginEmail));
			mv.setViewName("customer/mypage_form");
		}
		return mv;

	}

	@RequestMapping("orderHistoryForm")
	public ModelAndView orderHistoryForm(HttpSession session) {
		ModelAndView mv = new ModelAndView();

		String loginEmail = (String) session.getAttribute("loginEmail");

		
		List<OrderVo> orderListArray = service2.getOrderList(loginEmail);
		
		HashMap<Integer, String[]> map = new HashMap<>();
		// 상품 품목수
		List<Integer> countList = new ArrayList<Integer>();
		
	
		for (int i = 0; i < orderListArray.size(); i++) {
			int count = 0;
			
			String orderList = orderListArray.get(i).getOrderList();

			String[] orderArray = orderList.split(",");
			map.put(i, orderArray);
			
			for (int j = 0; j < orderArray.length; j +=2) {
				count += 1;	
			}
			count -= 1;
			countList.add(count);
		}
		
		

		//상품이름 불러오기
		Map<Integer, Object> map2 = new HashMap<>();
		for (int i=0; i<orderListArray.size(); i++) {
			map2.put(i, service3.productName(map.get(i)[0]));
			System.out.println(service3.productName(map.get(i)[0]));
		}
		
		
		//상품이미지 불러오기
		Map<Integer, Object> map3 = new HashMap<>();
		for (int i=0; i<orderListArray.size(); i++) {
			map3.put(i, service3.productImg(map.get(i)[0]));
		}
		
		mv.addObject("productCount",countList);
		mv.addObject("productImg", map3);
		mv.addObject("productName", map2);
		mv.addObject("orderInfo", service2.getOrderList(loginEmail));
		mv.addObject("info", service.getCustomerInfo(loginEmail));
		mv.addObject("totalPay", service.totalPay(loginEmail));
		mv.setViewName("customer/order_history_form");
		return mv;
	}
	
		

	@RequestMapping("orderDetailForm")
	public String orderDetailForm() {
		return "customer/order_detail_form";
	}

	@RequestMapping("mypageUpdateFormSuccess")
	public String mypageUpdateFormSuccess() {
		return "customer/mypage_from";
	}

}