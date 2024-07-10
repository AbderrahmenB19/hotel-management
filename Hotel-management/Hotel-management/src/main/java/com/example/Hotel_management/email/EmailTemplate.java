package com.example.Hotel_management.email;

import lombok.Getter;

@Getter
public enum EmailTemplate {
    ACTIVATE_ACCOUNT("activation_account.html");


    private final String name;

    EmailTemplate(String name){
        this.name=name;

    }
}
