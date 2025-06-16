package com.base.service;

import com.base.entity.User;

public interface MailService {
    void sendActivationEmail(User user, String token);
}
