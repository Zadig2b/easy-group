package com.base.exception;

public class DuplicateListNameException extends RuntimeException {
    public DuplicateListNameException(String name) {
        super("Vous avez déjà une liste appelée \"" + name + "\".");
    }
}
