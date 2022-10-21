package auction.guad.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.standard.ServletServerContainerFactoryBean;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{
	
	@Override
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/ws")
				// CORS
				.setAllowedOriginPatterns("*")
				// websocket를 지원하지 않는 브라우저에서도 websocket을 사용할 수 있도록 지원해주는 
				// SockJS를 사용하겠다
				.withSockJS();
	}
	
	// queue : 1대1
	// topic : 1대다
	
	@Override
	public void configureMessageBroker(MessageBrokerRegistry registry) {
		registry.setApplicationDestinationPrefixes("/pub"); 
		// /pub로 시작하는 url로 데이터를 전송하면 해당 url을 구독하는 client 모두에게 데이터 전송
		registry.enableSimpleBroker("/sub"); 
		// 이 주소를 구독한 채널에 메세지를 전송할 수 있게 등록
        
		registry.setUserDestinationPrefix("/SUB");

		/////////////////////////////////////////////
		// enableSimpleBroker : /sub가 prefix로 붙은 destination의 클라이언트에게
		// 메세지를 보낼 수 있도록 SimpleBroker를 등록한다
//		registry.enableSimpleBroker("/sub");

		// /pub가 prefix로 붙은 메세지들을 @MessageMapping이 붙은 method로 바운드
//		registry.setApplicationDestinationPrefixes("/pub");
	}
	
}