package com.capus.securedapi.exceptions;

//import io.swagger.v3.oas.annotations.Operation;
//import io.swagger.v3.oas.annotations.media.Schema;
//import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//@Tag(name = "ExceptionResponse", description = "The Error Response with detailled informations")
public class ExceptionResponse {
//    @Schema(required = true, description = "HTTP status Error", type = "java.lang.Integer", example = "418")
    private Integer status;
//    @Schema(required = true, description = "The detailed Error message", type = "java.lang.String", example = "Sorry !! I am a teapot !! you can't ask me to brew a cup of coffee")
    private String message;
}
