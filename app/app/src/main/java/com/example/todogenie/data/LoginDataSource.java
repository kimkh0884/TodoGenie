package com.example.todogenie.data;

import com.example.todogenie.data.model.LoggedInUser;

import java.io.IOException;

/**
 * Class that handles authentication w/ login credentials and turn activities after retrieves user information.
 * Not used since asynchronous way to receive http response cannot be implement in android networking.
 */
public class LoginDataSource {
    public Result<LoggedInUser> login(String userId, String password) {
        try {
            // TODO: handle loggedInUser authentication
            LoggedInUser fakeUser =
                    new LoggedInUser(
                            java.util.UUID.randomUUID().toString(),
                            "Jane Doe");
            return new Result.Success<>(fakeUser);
        } catch (Exception e) {
            return new Result.Error(new IOException("Error logging in", e));
        }
    }

    public void logout() {
        // TODO: revoke authentication
    }
}