package com.example.demo.mapper;

import java.util.List;

import vo.ProductVo;

public interface ProductMapper {

	public List<ProductVo> selectProductAll();

//   태우
	public ProductVo selectProduct(int productNum);

	public List<ProductVo> selectBurger();

	public List<ProductVo> selectSide();

	public List<ProductVo> selectDrink();

	public int updateProduct(ProductVo product);

	public int insertProduct(ProductVo product);

	public int deleteProduct(int productNum);
	//장바구니 전부 가져오기
	public List<ProductVo> basketAll();
	
	public String productName(String productNum);

	public String productImg(String productNum);
}