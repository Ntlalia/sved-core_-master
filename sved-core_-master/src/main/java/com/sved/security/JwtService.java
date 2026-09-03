package com.sved.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private static final String SECRET_KEY =
            "MiClaveSuperSeguraParaJWT2026SistemaVotos";

    private final SecretKey key =
            Keys.hmacShaKeyFor(
                    SECRET_KEY.getBytes(StandardCharsets.UTF_8)
            );

    public String generarTokenDeVoto(UUID eleccionId) {

        Instant ahora = Instant.now();

        String jti = UUID.randomUUID().toString();

        return Jwts.builder()
                .id(jti)
                .claim("eleccion_id", eleccionId.toString())
                .issuedAt(Date.from(ahora))
                .expiration(Date.from(ahora.plusSeconds(300)))
                .signWith(key)
                .compact();
    }

    public String generarTokenAdmin(String usuario, String rol) {

        Instant ahora = Instant.now();

        String jti = UUID.randomUUID().toString();

        return Jwts.builder()
                .id(jti)
                .claim("usuario", usuario)
                .claim("rol", rol)
                .claim("tipo", "ADMIN")
                .issuedAt(Date.from(ahora))
                .expiration(Date.from(ahora.plusSeconds(3600)))
                .signWith(key)
                .compact();
    }

    // ==========================================
    // VALIDAR TOKEN
    // ==========================================

    public Claims extraerClaims(String token) {

        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean esTokenAdmin(String token) {

        try {

            Claims claims = extraerClaims(token);

            String rol = claims.get("rol", String.class);
            String tipo = claims.get("tipo", String.class);

            return "ADMIN".equals(rol)
                    && "ADMIN".equals(tipo);

        } catch (Exception e) {

            return false;
        }
    }

    public String extraerUsuario(String token) {

        Claims claims = extraerClaims(token);

        return claims.get("usuario", String.class);
    }
}