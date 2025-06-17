package com.base;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(classes = BaseApp.class)
@ActiveProfiles("test")
class SmartHouseBackendApplicationTests {
    @Test
    void contextLoads() {
    }
}

