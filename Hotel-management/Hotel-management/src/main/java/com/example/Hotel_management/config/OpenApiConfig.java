package com.example.Hotel_management.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;



@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "user19",
                        email = "contact@User19.com",
                        url = "http://user19.com/website"
                ),
                description = "OpenApi documentation for hotel management",
                title = "openApi specification - user19",
                version = "1.0",
                license = @License(
                        name = "licence name",
                        url = "http://some-url.com"
                ),
                termsOfService = "terms of service"
        ),
        servers = {
                @Server(
                        description = "local Env",
                        url = "http://localhost:9090/api/v1"
                )
        },
        security = {
                @SecurityRequirement(
                        name = "bearerAuth"
                )
        }
)
@SecurityScheme(
        name = "bearerAuth",
        description = "JWT authentication description",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
