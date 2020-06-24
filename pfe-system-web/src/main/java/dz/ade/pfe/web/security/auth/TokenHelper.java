package dz.ade.pfe.web.security.auth;

import dz.ade.pfe.web.admin.user.dto.StructureTokenDto;
import dz.ade.pfe.web.security.config.SecurityProperties;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import serilogj.Log;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Component
public class TokenHelper {

    private static final String AUDIENCE = "web";
    private SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS512;
    private SecurityProperties securityProperties;

    public TokenHelper(SecurityProperties securityProperties) {
        this.securityProperties = securityProperties;
    }

    public Optional<String> getUsernameFromToken(String token) {
        String username = null;
        try {
            final Optional<Claims> claims = getAllClaimsFromToken(token);
            if (claims.isPresent()) {
                username = claims.get().getSubject();
            }
        } catch (Exception e) {
            Log.error("getUsernameFromToken : {@token}, {@exception}", token, e.getMessage());
        }

        return Optional.ofNullable(username);
    }
    public Optional<String> getOrganisationalStructureIdFromToken(String token) {
        String structureId = null;
        Optional<LinkedHashMap> organisationalStructureFromToken = getOrganisationalStructureFromToken(token);
        if(organisationalStructureFromToken.isPresent())
            structureId = organisationalStructureFromToken.get().get("id").toString();
        return Optional.ofNullable(structureId);
    }

    public Optional<LinkedHashMap> getOrganisationalStructureFromToken(String token) {
        LinkedHashMap structure = null;
        try {
            final Optional<Claims> claims = getAllClaimsFromToken(token);
            if (claims.isPresent()) {
                structure = ((LinkedHashMap) claims.get().get("structure"));
            }
        } catch (Exception e) {
            Log.error("getUsernameFromToken : {@token}, {@exception}", token, e.getMessage());
        }

        return Optional.ofNullable(structure);
    }

    public List<String> getRolesFromToken(String token) {
        List<String> roles = new ArrayList<>();
        try {
            final Optional<Claims> claims = getAllClaimsFromToken(token);
            if (claims.isPresent()) {
                roles = (List<String>) claims.get().get("roles");
            }
        } catch (Exception e) {
            Log.error("getUsernameFromToken : {@token}, {@exception}", token, e.getMessage());
        }

        return roles;
    }

    public Date getIssuedAtDateFromToken(String token) {
        Date issueAt = null;
        try {
            final Optional<Claims> claims = getAllClaimsFromToken(token);
            if (claims.isPresent()) {
                issueAt = claims.get().getIssuedAt();
            }
        } catch (Exception e) {
            Log.error("getIssuedAtDateFromToken : {@token}, {@exception}",
                    token, e.getMessage());
        }

        return issueAt;
    }

    public String generateRefreshToken(String token) {
        String refreshedToken = null;
        Date a = new Date();
        try {
            final Optional<Claims> claimsOp = getAllClaimsFromToken(token);
            if (claimsOp.isPresent()) {
                Claims claims = claimsOp.get();
                claims.setIssuedAt(a);
                refreshedToken = Jwts.builder()
                        .setClaims(claims)
                        .setExpiration(generateExpirationDate())
                        .signWith(signatureAlgorithm, securityProperties.getSecret())
                        .compact();
            }
        } catch (Exception e) {
            Log.error("refreshToken : {@token}, {@exception}", token,
                    e.getMessage());
        }

        return refreshedToken;
    }

    public String generateToken(String username, List<String> perms,
                                List<String> roles,
                                StructureTokenDto structureTokenDto,
                                boolean isPasswordChanged,
                                String fullName,
                                String email) {
        String token = Jwts.builder()
                .setId(UUID.randomUUID().toString())
                .setIssuer(securityProperties.getAppName())
                .setSubject(username)
                .setAudience(AUDIENCE)
                .setIssuedAt(new Date())
                .setExpiration(generateExpirationDate())
                .claim("passwordChanged", isPasswordChanged)
                .claim("perms", perms)
                .claim("roles", roles)
                .claim("fullName", fullName)
                .claim("email", email)
                .claim("avatar", "assets/images/avatars/profile.jpg")
                .claim("structure", structureTokenDto)
                .signWith(signatureAlgorithm, securityProperties.getSecret())
                .compact();

        /*redisTemplate.opsForHash().put("tokens", username, token);
        Object tokens = redisTemplate.opsForHash().get("tokens", username);
        Log.information("tokens {token}", tokens.toString());*/

        return token;
    }

    private Optional<Claims> getAllClaimsFromToken(String token) {
        Claims claims = null;
        try {
            claims = Jwts.parser()
                    .setSigningKey(securityProperties.getSecret())
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            claims = e.getClaims();
        } catch (Exception e) {
            Log.error("getAllClaimsFromToken : {@token}, {@exception}", token, e.getMessage());
        }

        return Optional.ofNullable(claims);
    }

    private Date generateExpirationDate() {
        return new Date(new Date().getTime() + securityProperties.getExpiresInSeconds() * 1000);
    }

    public Boolean isValidToken(String token, UserDetails userDetails) {
        final Optional<Claims> claims = getAllClaimsFromToken(token);

        if (!claims.isPresent()) return false;

        String username = claims.get().getSubject();

        return userDetails.getUsername().equals(username)
                && userDetails.isEnabled()
                && !isTokenExpired(claims.get());
    }

    public boolean isTokenExpired(String token) {
        boolean isExpired = false;
        try {
            final Optional<Claims> claims = getAllClaimsFromToken(token);
            isExpired = !claims.isPresent() || claims.get().getExpiration().before(new Date());
        } catch (Exception e) {
            Log.error("isTokenExpired : {@token}, {@exception}", token,
                    e.getMessage());
        }

        return isExpired;
    }

    public boolean isTokenExpired(Claims claims) {
        return claims.getExpiration().before(new Date());
    }

    public boolean isTokenRefreshable(String token) {
        Optional<Claims> claims = getAllClaimsFromToken(token);

        if (!claims.isPresent()) return false;

        long currentTime = new Date().getTime();
        long expiryTime = claims.get().getExpiration().getTime();

        return (currentTime > expiryTime) && (currentTime < (expiryTime + (securityProperties.getRefreshedTimeLapseSeconds() * 1000)));
    }

    public Optional<String> getToken(HttpServletRequest request) {
        String authHeader = getAuthHeaderFromHeader(request);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return Optional.of(authHeader.substring(7));
        }

        return Optional.empty();
    }

    public String getAuthHeaderFromHeader(HttpServletRequest request) {
        return request.getHeader(securityProperties.getAuthHeader());
    }

    public long getExpiredIn() {
        return securityProperties.getExpiresInSeconds();
    }
}
