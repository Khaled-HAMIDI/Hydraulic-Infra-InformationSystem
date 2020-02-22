package dz.ade.pfe.web.security.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import dz.ade.pfe.web.commons.apierrors.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    private final HttpMessageConverter<String> messageConverter;
    private final ObjectMapper mapper;

    public RestAuthenticationEntryPoint(HttpMessageConverter<String> messageConverter,
                                        ObjectMapper mapper) {
        this.messageConverter = messageConverter;
        this.mapper = mapper;
    }

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED);
        apiError.setMessage(authException.getMessage());
        apiError.setDebugMessage(authException.getMessage());

        try (ServerHttpResponse outputMessage = new ServletServerHttpResponse(response)) {
            outputMessage.setStatusCode(HttpStatus.UNAUTHORIZED);

            messageConverter.write(mapper.writeValueAsString(apiError), MediaType.APPLICATION_JSON, outputMessage);
        }
    }
}