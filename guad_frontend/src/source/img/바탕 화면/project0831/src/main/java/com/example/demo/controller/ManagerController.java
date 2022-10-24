package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.CustomerService;
import com.example.demo.service.ProductService;

import vo.ProductVo;

@Controller
public class ManagerController {
	@Autowired
	private ProductService service1;

	@Autowired
	private CustomerService service2;

	@RequestMapping("managerForm")
	public String managerForm() {
		return "manager/manager_form";
	}

	@RequestMapping("customerListForm")
	public ModelAndView customerListForm() {
		ModelAndView mv = new ModelAndView("manager/customer_list_form");
		
		mv.addObject("customerList", service2.selectAllCustomer());
		return mv;
	}

	@RequestMapping("productRegistForm")
	public ModelAndView productRegistForm() {
		ModelAndView mv = new ModelAndView("manager/product_regist_form");
		mv.addObject("productBurger", service1.productBurger());
		mv.addObject("productSide", service1.productSide());
		mv.addObject("productDrink", service1.productDrink());

		return mv;
	}

	@RequestMapping("statisForm")
	public String statisForm() {
		return "manager/statis_form";
	}

	@RequestMapping("productUpdateForm")
	public ModelAndView productUpdateForm(@RequestParam("pro") int productNum) {
		ModelAndView mv = new ModelAndView();
		mv.addObject("original", service1.selectProduct(productNum));
		mv.setViewName("manager/product_update_form");
		return mv;
	}

	@RequestMapping(value = "update", method = RequestMethod.POST)
	public ModelAndView update(ProductVo product) {
		ModelAndView mv = new ModelAndView();
		int result = service1.update(product);
		mv.addObject("productNum", product.getProductNum());
		mv.addObject("updateResult", result);
		mv.setViewName("manager/product_update_result");
		return mv;
	}

	@RequestMapping("productUpdateResult")
	public String productUpdateResult() {
		return "manager/product_update_result";
	}

	@RequestMapping("productDelete")
	public String productDelete() {
		return "manager/customer_list_form";
	}

	@RequestMapping("/delete")
	public ModelAndView delete(@RequestParam("productNum") int productNum) {
		int result = service1.delete(productNum);
		ModelAndView mv = new ModelAndView();
		mv.addObject("result", result);
		mv.setViewName("manager/product_delete_result");
		return mv;
	}

	@RequestMapping("productInsertForm")
	public String productInsertForm() {
		return "manager/product_insert_form";
	}

	@RequestMapping(value = "insert", method = RequestMethod.POST)

	public ModelAndView insert(ProductVo product) {
		ModelAndView mv = new ModelAndView();
		System.out.println(product);
		int result = service1.insert(product);
		System.out.println(result);
		mv.addObject("productNum", product.getProductNum());
		mv.addObject("insertResult", result);
		mv.setViewName("manager/product_insert_result");
		return mv;
	}

	@RequestMapping("productInsertSuccess")
	public String productInsertSuccess() {
		return "product_regist_form";
	}

}
