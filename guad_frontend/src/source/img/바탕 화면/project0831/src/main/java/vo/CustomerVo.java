package vo;

import java.util.Date;

public class CustomerVo {

	private int memberNum;
	private String email;
	private String name;
	private String phone;
	private boolean sex;
	private Date birth;
	private String year;
	private String month;
	private String day;
	private String password;
	private Date joinDate;
	
	
	public int getMemberNum() {
		return memberNum;
	}
	public void setMemberNum(int memberNum) {
		this.memberNum = memberNum;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public boolean isSex() {
		return sex;
	}
	public void setSex(boolean sex) {
		this.sex = sex;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Date getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}
	@Override
	public String toString() {
		return "CustomerVo [memberNum=" + memberNum + ", email=" + email + ", name=" + name + ", phone=" + phone
				+ ", sex=" + sex + ", birth=" + birth + ", year=" + year + ", month=" + month + ", day=" + day
				+ ", password=" + password + ", joinDate=" + joinDate + "]";
	}

	
	
}