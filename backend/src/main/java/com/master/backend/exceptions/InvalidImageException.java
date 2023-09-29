package com.master.backend.exceptions;

public class InvalidImageException extends RuntimeException{
    public InvalidImageException(String message) {
        super(message);
    }
}
