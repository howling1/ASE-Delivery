package edu.tum.ase.backend.jwt;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    @Autowired
    private KeyStoreManager keyStoreManager;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        String jwt = Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("aseproject")
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Expires after 5 hours
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5))
                .signWith(keyStoreManager.getPrivateKey(), SignatureAlgorithm.RS256)
                .compact();

        return jwt;
    }

    private JwtParser loadJwtParser() {
        return Jwts.parserBuilder()
                .setSigningKey(keyStoreManager.getPublicKey())
                .build();
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return loadJwtParser().parseClaimsJws(token).getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Header extractAllHeaders(String token) {
        return loadJwtParser().parseClaimsJwt(token).getHeader();
    }

    // Check if the JWT is signed by us, and is not expired
    public boolean verifyJwtSignature(String token) throws Exception {
        String Issuer = extractClaim(token, Claims::getIssuer);
        if (isTokenExpired(token)) {
            throw new ExpiredJwtException(extractAllHeaders(token),extractAllClaims(token),"JWT is expired");
        }
        if (!Issuer.equals("aseproject") ) {
            throw new Exception("JWT is not signed by us");
        }
        return true;
    }
}
