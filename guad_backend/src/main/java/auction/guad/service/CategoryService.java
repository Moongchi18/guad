package auction.guad.service;

import java.util.ArrayList;

import auction.guad.dto.CategoryDto;

public interface CategoryService {
	
	public ArrayList<CategoryDto> selectAllCategory() throws Exception;
	public ArrayList<CategoryDto> selectItemType(String itemType) throws Exception;
	public CategoryDto selectItemDType(String itemDType) throws Exception;
}
