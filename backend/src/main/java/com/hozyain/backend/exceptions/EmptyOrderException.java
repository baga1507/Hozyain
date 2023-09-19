package com.hozyain.backend.exceptions;

public class EmptyOrderException extends RuntimeException {

    public EmptyOrderException(String message) {
        super(message);
    }
}
