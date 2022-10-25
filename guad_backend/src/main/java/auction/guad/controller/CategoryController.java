package auction.guad.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.dto.CategoryDto;
import auction.guad.dto.MemberDto;
import auction.guad.service.CategoryService;
import auction.guad.service.CategoryServiceImpl;

@RestController
public class CategoryController {
	
	private CategoryService categoryService;
	@Autowired
	public CategoryController(CategoryService categoryService) {
		this.categoryService = categoryService;
	}
	
	// 전체 카테고리 조회
	@RequestMapping(value = "/category", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<CategoryDto>> selectAllCategory() throws Exception{
		System.out.println(categoryService.selectAllCategory());
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectAllCategory());
	}
	
	//  대분류 조회 : pathvariable
	@RequestMapping(value = "/category/{itemType}", method = RequestMethod.GET)
	public ResponseEntity<ArrayList<CategoryDto>> selectItemType(@PathVariable String itemType) throws Exception{
		System.out.println(categoryService.selectItemType(itemType));
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectItemType(itemType));
	}
	
	// 소분류 조회 : pathvariable
	@RequestMapping(value = "/category/detail/{itemDType}", method = RequestMethod.GET)
	public ResponseEntity<CategoryDto> selectDetailType(@PathVariable String itemDType) throws Exception{
		System.out.println(categoryService.selectItemDType(itemDType));
		return ResponseEntity.status(HttpStatus.OK).body(categoryService.selectItemDType(itemDType));
	}
	
	
}
