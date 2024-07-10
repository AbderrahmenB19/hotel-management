package com.example.Hotel_management.utility;

import java.security.SecureRandom;

public class Utils {
    private static final String ALPHANUMERIC_STRING="123456789AZERTYUIOPQSDFGHJKLMWXCVBN";
    private static final SecureRandom secureRandom = new SecureRandom();

    public static String generateRandomAlphanumeric(int length){
        StringBuilder stringBuilder= new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex=secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            stringBuilder.append(ALPHANUMERIC_STRING.charAt(randomIndex));

        }
        return stringBuilder.toString();
    }
}
