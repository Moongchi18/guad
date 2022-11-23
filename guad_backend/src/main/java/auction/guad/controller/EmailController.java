package auction.guad.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import auction.guad.MailUtil;

@RestController
public class EmailController {

		@Autowired
		private MailUtil mailUtil;

}
