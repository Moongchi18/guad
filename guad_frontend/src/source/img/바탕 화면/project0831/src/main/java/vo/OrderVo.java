package vo;

import java.util.Date;

public class OrderVo {

	private String orderEmail;
	private int orderNum;
	private String orderAddress;
	private String orderList;
	private String orderTime;
	public String getOrderEmail() {
		return orderEmail;
	}
	public void setOrderEmail(String orderEmail) {
		this.orderEmail = orderEmail;
	}
	public int getOrderNum() {
		return orderNum;
	}
	public void setOrderNum(int orderNum) {
		this.orderNum = orderNum;
	}
	public String getOrderAddress() {
		return orderAddress;
	}
	public void setOrderAddress(String orderAddress) {
		this.orderAddress = orderAddress;
	}
	public String getOrderList() {
		return orderList;
	}
	public void setOrderList(String orderList) {
		this.orderList = orderList;
	}
	public String getOrderTime() {
		return orderTime;
	}
	public void setOrderTime(String orderTime) {
		this.orderTime = orderTime;
	}
	@Override
	public String toString() {
		return "OrderVo [orderEmail=" + orderEmail + ", orderNum=" + orderNum + ", orderAddress=" + orderAddress
				+ ", orderList=" + orderList + ", orderTime=" + orderTime + "]";
	}

	

}