package com.minijobboard.dto;

import com.minijobboard.entity.ApplicationStatus;
import jakarta.validation.constraints.NotNull;

public class ApplicationStatusRequest {
    @NotNull
    private ApplicationStatus status;

    public ApplicationStatusRequest() {}

    public ApplicationStatusRequest(ApplicationStatus status) {
        this.status = status;
    }

    public ApplicationStatus getStatus() { return status; }
    public void setStatus(ApplicationStatus status) { this.status = status; }
}
