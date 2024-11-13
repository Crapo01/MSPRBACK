package com.capus.securedapi.payload.response;

import lombok.Data;

@Data
public class CaptchaResponseType {
    private boolean success;
    private String challenge_ts;
    private String hostname;
}
