package dz.ade.pfe.web.commons.notification.configuration

import org.springframework.security.config.annotation.web.messaging.MessageSecurityMetadataSourceRegistry
import org.springframework.security.config.annotation.web.socket.AbstractSecurityWebSocketMessageBrokerConfigurer
import org.springframework.stereotype.Component

@Component
class WebSocketAuthorizationSecurityConfiguration : AbstractSecurityWebSocketMessageBrokerConfigurer() {

    override fun configureInbound(messages: MessageSecurityMetadataSourceRegistry) {
        messages.anyMessage().authenticated()
    }

    override fun sameOriginDisabled(): Boolean {
        return true
    }
}
