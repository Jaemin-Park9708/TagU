package com.ssafy.project.exception;

public class OverLimitGroupCountException extends RuntimeException {
    public OverLimitGroupCountException(String message) {
        super(message);
    }
}
