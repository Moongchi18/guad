//package auction.guad.security;
//
//import java.security.Key;
//import java.time.Instant;
//import java.time.temporal.ChronoUnit;
//import java.util.Base64;
//import java.util.Date;
//import java.util.UUID;
//import java.util.function.Function;
//
//import javax.crypto.spec.SecretKeySpec;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.env.Environment;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.stereotype.Component;
//
//import board.entity.MemberEntity;
//import io.jsonwebtoken.Claims;
//import io.jsonwebtoken.Jws;
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import lombok.extern.slf4j.Slf4j;
//
//// https://www.javainuse.com/spring/boot-jwt
//
//@Slf4j
//@Component
//public class JwtTokenUtil {
//
//	private String secret;
//	private Long expirationTime;
//	
//	@Autowired
//	public JwtTokenUtil(Environment env) {
//		this.secret = env.getProperty("token.secret");
//		this.expirationTime = Long.valueOf(env.getProperty("token.expiration-time"));
//		
//		log.debug(this.secret);
//		log.debug(Long.toString(this.expirationTime));
//	}
//	
//	public String generateToken(MemberEntity memberEntity) {
//		
//		Key hmacKey = new SecretKeySpec(
//			Base64.getDecoder().decode(this.secret), SignatureAlgorithm.HS256.getJcaName()
//		);
//		
//		Instant now = Instant.now();
//		String jwtToken = Jwts.builder()
//				.claim("name", memberEntity.getMemberName())
//				.claim("email", memberEntity.getMemberEmail())
//				.setSubject(memberEntity.getMemberEmail())
//				.setId(UUID.randomUUID().toString())
//				.setIssuedAt(Date.from(now))
//				.setExpiration(Date.from(now.plus(this.expirationTime, ChronoUnit.MILLIS)))
//				.signWith(hmacKey)
//				.compact();
//		log.debug(jwtToken);
//		
//		return jwtToken;
//	}
//	
//	private Boolean isTokenExpired(String token) {
//		final Date expiration = getExpirationDateFromToken(token);
//		// expiration : 만료시간 => date보다 커야 유효한 토큰이고 date보다 작으면 만료된 토큰
//		// true면 만료, false면 유효
//		return expiration.before(new Date());
//	}
//	
//	public Boolean validateToken(String token, UserDetails userDetails) {
//		// 토큰 내에 있는 subject(이메일)와 memberentity에 있는 이메일을 비교하고, 
//		// 토큰 유효기간을 체크
//		String subject = getSubjectFromToken(token);
//		String username = userDetails.getUsername();
//		
//		if (subject != null && username != null && subject.equals(username) && !isTokenExpired(token)) {
//			return Boolean.TRUE;
//		} else {
//			return Boolean.FALSE;
//		}		
//	}
//	
////	Function<Claims, Date> claimsResolver2 = new Function<> () {
////
////		@Override
////		public Date apply(Claims t) {
////			return t.getExpiration();
////		}
////		
////	};	
////	public Date getExpirationDateFromToken2(String token) {
////		return getClaimFromToken(token, claimsResolver2);
////	}
////	
////	Function<Claims, Date> claimsResolver3 = (Claims t) -> t.getExpiration();
////	public Date getExpirationDateFromToken3(String token) {
////		return getClaimFromToken(token, claimsResolver3);
////	}
////	
////	Function<Claims, Date> claimsResolver4 = Claims::getExpiration;
////	public Date getExpirationDateFromToken4(String token) {
////		return getClaimFromToken(token, claimsResolver4);
////	}
//	
//	public Date getExpirationDateFromToken(String token) {
//		return getClaimFromToken(token, Claims::getExpiration);
//	}
//	
////	Function<Claims, String> c1 = new Function<Claims, String>() {
////		@Override
////		public String apply(Claims t) {
////			return t.getSubject();
////		}
////	};
////	
////	Function<Claims, String> c2 = (Claims t) -> t.getSubject();
////	
////	Function<Claims, String> c3 = Claims::getSubject; 
//	
//	public String getSubjectFromToken(String token) {
//		return getClaimFromToken(token, Claims::getSubject);
//	}
//	
//	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
//		final Claims claims = getAllClaimsFromToken(token);
//		return claimsResolver.apply(claims);
//	}
//	
//	private Claims getAllClaimsFromToken(String token) {
//		
//		Key hmacKey = new SecretKeySpec(
//			Base64.getDecoder().decode(this.secret), SignatureAlgorithm.HS256.getJcaName()
//		);
//		
//		Jws<Claims> jwt = Jwts.parserBuilder()
//				.setSigningKey(hmacKey)
//				.build()
//				.parseClaimsJws(token);
//		
//		return jwt.getBody();
//		//return Jwts.parser().setSigningKey(this.secret).parseClaimsJws(token).getBody();
//	}
//}
