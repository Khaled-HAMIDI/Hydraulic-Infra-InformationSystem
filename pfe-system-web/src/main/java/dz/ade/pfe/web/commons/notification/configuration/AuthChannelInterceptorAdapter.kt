package dz.ade.pfe.web.commons.notification.configuration

import dz.ade.pfe.admin.security.user.UserComponent
import dz.ade.pfe.web.security.auth.TokenBasedAuthentication
import dz.ade.pfe.web.security.auth.TokenHelper
import org.springframework.messaging.Message
import org.springframework.messaging.MessageChannel
import org.springframework.messaging.simp.stomp.StompCommand
import org.springframework.messaging.simp.stomp.StompHeaderAccessor
import org.springframework.messaging.support.ChannelInterceptor
import org.springframework.messaging.support.MessageHeaderAccessor
import org.springframework.stereotype.Component
import java.io.IOException

@Component
class AuthChannelInterceptorAdapter(
        private val tokenHelper: TokenHelper,
        private val userComponent: UserComponent
) : ChannelInterceptor {

    companion object {
        private const val TOKEN_HEADER = "token"
    }

    override fun preSend(message: Message<*>, channel: MessageChannel): Message<*>? {
        val accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor::class.java)

        if (StompCommand.CONNECT == accessor!!.command) {
            val token = accessor.getFirstNativeHeader(TOKEN_HEADER)

            val username = tokenHelper.getUsernameFromToken(token)
                    .orElseThrow { IOException() }
            val userDetails = userComponent.loadUserByUsername(username)
            if (tokenHelper.isValidToken(token, userDetails)) {
                val authentication = TokenBasedAuthentication(userDetails)
                authentication.token = token
                accessor.user = authentication
            }
        }

        return message
    }
}