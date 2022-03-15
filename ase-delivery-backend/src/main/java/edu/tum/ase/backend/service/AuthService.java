package edu.tum.ase.backend.service;

import edu.tum.ase.backend.config.CookieConfig;
import edu.tum.ase.backend.jwt.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@RestController
public class AuthService {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder bcryptPasswordEncoder;

    @Autowired
    private MongoUserDetailsService mongoUserDetailsService;

    @Autowired
    private CookieConfig cookieConfig;

    public ResponseEntity<String> authenticateUser(String authorization, HttpServletRequest request,
                                                   HttpServletResponse response) {

        String basicAuthCredential = authorization.substring("Basic".length()).trim();

        byte[] credentialBytes = Base64.getDecoder().decode(basicAuthCredential);

        final String[] credential = new String(credentialBytes, StandardCharsets.UTF_8).split(":");

        String email = credential[0];
        String password = credential[1];

        UserDetails userDetails = (User) mongoUserDetailsService.loadUserByUsername(email);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, password);

        Authentication authentication = null;

        try {
            authentication = authManager.authenticate(usernamePasswordAuthenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            final String jwt = jwtUtil.generateToken(userDetails);

            Cookie jwtCookie = cookieConfig.createCookie("jwt", jwt);

            response.addCookie(jwtCookie);

            return new ResponseEntity<String>(jwt, HttpStatus.OK);

        } catch (BadCredentialsException badCredentialsException) {
            badCredentialsException.printStackTrace();
            return new ResponseEntity<String>(
                    "Username or password is incorrect",
                    HttpStatus.BAD_REQUEST
            );
        } catch (Exception exception) {
            exception.printStackTrace();
            return new ResponseEntity<String>(
                    "Internal server error",
                    HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    public void setAuthentication(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(
                        userDetails,
                        userDetails.getPassword(),
                        userDetails.getAuthorities()
                );

        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    public ResponseEntity<String> removeCurrentUser(HttpServletResponse response) {
        response.addCookie(cookieConfig.deleteCookie("jwt"));
        return new ResponseEntity<String>("JwtCookie Successfully Deleted!", HttpStatus.OK);
    }
}
