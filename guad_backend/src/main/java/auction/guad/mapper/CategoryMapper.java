package auction.guad.mapper;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import auction.guad.dto.CategoryDto;

@Mapper
public interface CategoryMapper {

	ArrayList<CategoryDto> selectAllCategory() throws Exception;
	ArrayList<CategoryDto> selectItemType(String itemType) throws Exception;
	CategoryDto selectItemDType(String itemDType) throws Exception;
}
