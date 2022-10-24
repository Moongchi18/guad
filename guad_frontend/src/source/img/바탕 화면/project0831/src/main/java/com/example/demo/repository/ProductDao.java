package com.example.demo.repository;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.mapper.ProductMapper;

import vo.ProductVo;

@Component
public class ProductDao {
	@Autowired
	private SqlSessionTemplate session;

	public List<ProductVo> selectProductAll() {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.selectProductAll();
	}
//   태우
	public ProductVo selectProduct(int productNum) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.selectProduct(productNum);
	}

	public List<ProductVo> selectBurger() {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.selectBurger();
	}

	public List<ProductVo> selectSide() {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.selectSide();
	}

	public List<ProductVo> selectDrink() {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.selectDrink();
	}

	public int updateProduct(ProductVo prduct) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.updateProduct(prduct);
	}

	public int insertProduct(ProductVo prduct) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.insertProduct(prduct);
	}

	public int deleteProduct(int productNum) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.deleteProduct(productNum);
	}

	//장바구니 전부 가져오기
	public List<ProductVo> basketAll() {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.basketAll();
	}
	//상품 이름 가져오기
	public String productName(String productNum) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.productName(productNum);
	}
	// 상품 이미지 가져오기
	public String productImg(String productNum) {
		ProductMapper mapper = session.getMapper(ProductMapper.class);
		return mapper.productImg(productNum);
	}
}