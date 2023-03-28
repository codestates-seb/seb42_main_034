package com.project.tripAdvisor.response;

import com.project.tripAdvisor.exception.ExceptionCode;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ추후 수정ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
@Getter
public class ErrorResponse {
    private Integer status;

    private String message;
    private List<FieldError> fieldErrors;
    private List<ConstraintViolationError> violationErrors;


    private ErrorResponse(int status, String message) {
        this.status = status;
        this.message = message;
    }

    private ErrorResponse(List<FieldError> fieldErrors, List<ConstraintViolationError> violationErrors){
        this.fieldErrors = fieldErrors;
        this.violationErrors = violationErrors;
    }

    // (4) BindingResult에 대한 ErrorResponse 객체 생성
    public static ErrorResponse of(BindingResult bindingResult){
        return new ErrorResponse(FieldError.of(bindingResult), null);
    }

    public static ErrorResponse of(Set<ConstraintViolation<?>> violations){
        return new ErrorResponse(null, ConstraintViolationError.of(violations));
    }


    public static ErrorResponse of(ExceptionCode exceptionCode) {
        return new ErrorResponse(exceptionCode.getStatus(), exceptionCode.getMessage());
    }

    public static ErrorResponse of(HttpStatus httpStatus) {
        return new ErrorResponse(httpStatus.value(), httpStatus.getReasonPhrase());
    }

    public static ErrorResponse of(HttpStatus httpStatus, String message) {
        return new ErrorResponse(httpStatus.value(), message);
    }

    @Getter
    @AllArgsConstructor
    public static class FieldError{
        private String field;
        private Object rejectedValue;
        private String reason;

        public static List<FieldError> of(BindingResult bindingResult){
            final List<org.springframework.validation.FieldError> fieldErrors =
                    bindingResult.getFieldErrors();

            return  fieldErrors.stream()
                    .map(error -> new FieldError(
                            error.getField(),
                            error.getRejectedValue() == null ?
                                    "": error.getRejectedValue().toString(),
                            error.getDefaultMessage()))
                    .collect(Collectors.toList());

        }
    }

    @Getter
    public static class ConstraintViolationError{
        private String propertyPath;
        protected Object rejectedValue;
        private String reason;

        private ConstraintViolationError(String propertyPath, Object rejectedValue, String reason){
            this.propertyPath = propertyPath;
            this.rejectedValue = rejectedValue;
            this.reason = reason;
        }

        public static List<ConstraintViolationError> of(
                Set<ConstraintViolation<?>> constraintViolations){
            return constraintViolations.stream()
                    .map(constraintViolation -> new ConstraintViolationError(
                            constraintViolation.getPropertyPath().toString(),
                            constraintViolation.getInvalidValue().toString(),
                            constraintViolation.getMessage()
                    )).collect(Collectors.toList());
        }

    }
}