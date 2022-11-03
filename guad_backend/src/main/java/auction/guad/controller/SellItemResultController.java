package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import auction.guad.service.SellItemResultService;

@Controller
public class SellItemResultController {

	private SellItemResultService sellItemResultService;
	@Autowired
	public SellItemResultController(SellItemResultService sellItemResultService) {
		this.sellItemResultService = sellItemResultService;
	}
	/////////////////////////////////////////////////////////////////////////////
	
}
