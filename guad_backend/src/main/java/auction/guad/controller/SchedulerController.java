package auction.guad.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import auction.guad.dto.SellItemDto;
import auction.guad.dto.SellItemResultDto;
import auction.guad.service.SchedulerService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component 
@EnableAsync 
public class SchedulerController {
	
	private SchedulerService schedulerService;
	
	@Autowired
	public SchedulerController(SchedulerService schedulerService) {
		this.schedulerService = schedulerService;
	}
	
	@Scheduled(cron = "01 * * * * ?")
    public void scheduleAuctionCheck() throws Exception {
		List<SellItemResultDto> overPeriod = schedulerService.auctionPeriodCheck();
		System.err.println(schedulerService.auctionPeriodCheck());
		
		for(int i = 0; i < overPeriod.size(); i++) {
			schedulerService.auctionSellitemUpdate(overPeriod.get(i).getItemNum());
		}
		
		for(int i = 0; i< overPeriod.size(); i++) {
			schedulerService.auctionResultInsert(overPeriod.get(i));
		}
    }
}
