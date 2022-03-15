package edu.tum.ase.backend.filter;

import edu.tum.ase.backend.jwt.JwtUtil;
import edu.tum.ase.backend.service.AuthService;
import edu.tum.ase.backend.service.MongoUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthRequestFilter extends OncePerRequestFilter {

    @Autowired
    private MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String username = null;
        String jwt = null;

        Cookie[] cookies = request.getCookies();

        final String authHeader = request.getHeader("Authorization");

        // try to get jwt from cookies
        if (cookies != null){
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("jwt")){
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt != null){
            try {
                if (jwtUtil.verifyJwtSignature(jwt)){
                    username = jwtUtil.extractUsername(jwt);
                }
            } catch (ExpiredJwtException expiredJwtException) {
                System.out.println("Failure at verifying JWT due to token expiration");
                expiredJwtException.printStackTrace();
                response.sendError(HttpStatus.EXPECTATION_FAILED.value(), "Token expired");
                return;
            } catch (Exception exception) {
                System.out.println("Unmatched JWT signature");
                exception.printStackTrace();
                response.sendError(HttpStatus.EXPECTATION_FAILED.value(),"Unmatched JWT signature");
                return;
            }
        } else {
            if (authHeader != null && !authHeader.startsWith("Basic")){
                response.sendError(HttpStatus.BAD_REQUEST.value(), "No Basic Auth information found!");
                return;
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null)
        {
            UserDetails userDetails = null;
            try {
                userDetails = mongoUserDetailsService.loadUserByUsername(username);
            } catch (UsernameNotFoundException usernameNotFoundException){
                usernameNotFoundException.printStackTrace();
                response.sendError(HttpStatus.EXPECTATION_FAILED.value(), "The user specified in JWT dose not exist!");
                return;
            }
            authService.setAuthentication(userDetails, request);

            // print the token set for testing
            Authentication authContext = SecurityContextHolder.getContext().getAuthentication();
            System.out.println(String.format("Authenticate Token Set:\n"
                    + "Username: %s\n"
                    + "Password: %s\n"
                    + "Authority: %s\n",
                    authContext.getPrincipal(),
                    authContext.getCredentials(),
                    authContext.getAuthorities().toString()
            ));

        }
        filterChain.doFilter(request, response);
    }
}
