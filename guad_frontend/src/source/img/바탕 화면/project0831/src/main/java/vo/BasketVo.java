package vo;

public class BasketVo {
	private String basketProduct;
	private String basketProductNum;
	public String getBasketProduct() {
		return basketProduct;
	}
	public void setBasketProduct(String basketProduct) {
		this.basketProduct = basketProduct;
	}
	public String getBasketProductNum() {
		return basketProductNum;
	}
	public void setBasketProductNum(String basketProductNum) {
		this.basketProductNum = basketProductNum;
	}
	@Override
	public String toString() {
		return "BasketVo [basketProduct=" + basketProduct + ", basketProductNum=" + basketProductNum + "]";
	}



}
