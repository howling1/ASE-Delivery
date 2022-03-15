package edu.tum.ase.backend.config;

import org.springframework.context.annotation.Configuration;

import javax.servlet.http.Cookie;

@Configuration
public class CookieConfig {

    public Cookie createCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);

        cookie.setHttpOnly(true);
        cookie.setMaxAge(2*60*60); // 2 hours
        cookie.setSecure(false);
        cookie.setPath("/");

        return cookie;
    }

    public Cookie deleteCookie(String key) {
        Cookie cookie = new Cookie(key, null);

        cookie.setHttpOnly(true);
        cookie.setMaxAge(0); // delete the cookie by setting expiry to zero
        cookie.setSecure(false);
        cookie.setPath("/");

        return cookie;
    }
}
