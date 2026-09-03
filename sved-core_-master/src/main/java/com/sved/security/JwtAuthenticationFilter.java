package com.sved.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String SECRET_KEY =
            "MiClaveSuperSeguraParaJWT2026SistemaVotos";

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        System.out.println("======================================");
        System.out.println("REQUEST: " + request.getRequestURI());
        System.out.println("Authorization: " + authHeader);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {

            System.out.println("NO HAY TOKEN JWT");

            filterChain.doFilter(request, response);
            return;
        }

        try {

            String token = authHeader.substring(7);

            Claims claims = Jwts.parser()
                    .verifyWith(
                            io.jsonwebtoken.security.Keys.hmacShaKeyFor(
                                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
                            )
                    )
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String usuario = claims.get("usuario", String.class);
            String rol = claims.get("rol", String.class);

            System.out.println("JWT usuario: " + usuario);
            System.out.println("JWT rol: " + rol);

            if (usuario != null && rol != null) {

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                usuario,
                                null,
                                Collections.singletonList(
                                        new SimpleGrantedAuthority(
                                                "ROLE_" + rol
                                        )
                                )
                        );

                SecurityContextHolder
                        .getContext()
                        .setAuthentication(authentication);

                System.out.println(
                        "AUTENTICADO: " +
                                SecurityContextHolder
                                        .getContext()
                                        .getAuthentication()
                                        .getAuthorities()
                );

                System.out.println(
                        "AUTH USER: " +
                                SecurityContextHolder
                                        .getContext()
                                        .getAuthentication()
                                        .getName()
                );
            }

        } catch (Exception e) {

            System.out.println("ERROR VALIDANDO JWT:");
            System.out.println(e.getMessage());

            SecurityContextHolder.clearContext();
        }

        filterChain.doFilter(request, response);
    }
}