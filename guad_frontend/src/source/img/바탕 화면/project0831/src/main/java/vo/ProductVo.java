package vo;

public class ProductVo {

	private int productNum;
	private String productType;
	private String productName;
	private int productPrice;
	private String productImg;
	private int productMany;

	public int getProductNum() {
		return productNum;
	}

	public void setProductNum(int productNum) {
		this.productNum = productNum;
	}

	public String getProductType() {
		return productType;
	}

	public void setProductType(String productType) {
		this.productType = productType;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public int getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(int productPrice) {
		this.productPrice = productPrice;
	}

	public String getProductImg() {
		return productImg;
	}

	public void setProductImg(String productImg) {
		this.productImg = productImg;
	}

	public int getProductMany() {
		return productMany;
	}

	public void setProductMany(int productMany) {
		this.productMany = productMany;
	}

	@Override
	public String toString() {
		return "ProductVo [productNum=" + productNum + ", productType=" + productType + ", productName=" + productName
				+ ", productPrice=" + productPrice + ", productImg=" + productImg + ", productMany=" + productMany
				+ "]";
	}

}