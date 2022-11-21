package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;


import auction.guad.service.SchedulerService;

import lombok.extern.slf4j.Slf4j;

//@Slf4j
//@Component 
//@EnableAsync 
//public class SchedulerController {
//	
//	private SchedulerService schedulerservice;
//	
//	@Autowired
//	public SchedulerController(SchedulerService schedulerservice) {
//		this.schedulerservice = schedulerservice;
//	}
//	
//	
//	@Scheduled(cron = "01 0 * * * ?")
//    public void scheduleAuctionCheck() {
//        long now = System.currentTimeMillis() / 1000;
//        log.info("schedule tasks using cron jobs - {}", now);
//    }
//}
