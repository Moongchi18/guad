package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.repository.ProductDao;

import vo.ProductVo;

@Component
public class ProductService {

	@Autowired
	private ProductDao dao;

	public ProductVo selectProduct(int productNum) {
		return dao.selectProduct(productNum);
	}

	public List<ProductVo> productBurger() {
		return dao.selectBurger();
	}

	public List<ProductVo> productSide() {
		return dao.selectSide();
	}

	public List<ProductVo> productDrink() {
		return dao.selectDrink();
	}

	public int update(ProductVo product) {
		return dao.updateProduct(product);
	}

	public int insert(ProductVo product) {
		return dao.insertProduct(product);
	}

	public int delete(int productNum) {
		return dao.deleteProduct(productNum);
	}

	public List<ProductVo> basketAll() {
		return dao.basketAll();
	}
	
	public String productName(String productNum) { 
		return dao.productName(productNum);
	}
	
	public String productImg(String productNum) { 
		return dao.productImg(productNum);
	}
		
}