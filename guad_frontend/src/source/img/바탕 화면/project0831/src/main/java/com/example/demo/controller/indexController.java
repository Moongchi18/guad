package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.ProductService;

@Controller
public class indexController {

   @Autowired
   private ProductService service;

   @RequestMapping("/")
   public String index() {
      return "index";
   }

   @RequestMapping("brandForm")
   public String brand() {
      return "brand_form";
   }

   @RequestMapping("menuForm")
   public ModelAndView menu() {
      ModelAndView mv = new ModelAndView("menu_form");
      mv.addObject("productBurger", service.productBurger());
      mv.addObject("productSide", service.productSide());
      mv.addObject("productDrink", service.productDrink());
      return mv;
   }

}