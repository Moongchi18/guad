package auction.guad.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import auction.guad.dto.MemberDto;

@Controller
@RequestMapping("/api")
public class GoogleLoginController {
    
    final static String GOOGLE_AUTH_BASE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    final static String GOOGLE_TOKEN_BASE_URL = "https://oauth2.googleapis.com/token";
    final static String GOOGLE_REVOKE_TOKEN_BASE_URL = "https://oauth2.googleapis.com/revoke";
    

//    @RequestMapping(value = "/google/auth", method = RequestMethod.POST)
//    public ResponseEntity<String> googleAuth(@RequestBody MemberDto member) throws Exception {
    
    
//    }


}