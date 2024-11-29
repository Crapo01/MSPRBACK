package com.capus.securedapi.exceptions;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class ApiException extends Exception {

    private static final long serialVersionUID = -7052723801508438974L;

    private HttpStatus status;

    public ApiException(final String message, final Throwable t, final HttpStatus status) {
        super(message, t);
        this.status = status;
    }

    public ApiException(final String message, final Throwable t) {
        super(message, t);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public ApiException(final String message, final HttpStatus status) {
        super(message);
        this.status = status;
    }

    public ApiException(final String message) {
        super(message);
        this.status = HttpStatus.BAD_REQUEST;
    }

    public ApiException(final HttpStatus status) {
        super();
        this.status = status;
    }

    public ApiException() {
        super();
        this.status = HttpStatus.BAD_REQUEST;
    }

    public HttpStatus getStatus() {
        return this.status;
    }
}
