package auction.guad.dto;

import java.util.Date;

import lombok.Data;

@Data
public class CommentsDto {
	private int commentNum;
	private int itemNum;
	private String memberEamil;
	
	private String title;
	private String contents;
	private int likeCnt;
	private Date writeDate;
	
	private Date updateDate;
	private String deleteYn;
	private Date deleteDate;
}
