package com.capus.securedapi.pushNotifications;


import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;


@org.springframework.stereotype.Controller
public class Controller {

    @MessageMapping("/broadcast")
    @SendTo("/topic/reply")
    public String broadcastMessage(@Payload String message) {
        return "You have received a message: " + message;
    }
}
