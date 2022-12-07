package com.example.todogenie.ui.register;

import android.util.Patterns;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.todogenie.R;

public class RegisterViewModel extends ViewModel {
    private MutableLiveData<RegisterFormState> registerFormState = new MutableLiveData<>();

    LiveData<RegisterFormState> getRegisterFormState() {
        return registerFormState;
    }

    public void Register(String userId, String password) {
        /* Failed to implement http connection with asynchronous way, */
//        Result<LoggedInUser> result = RegisterRepository.Register(username, password);
//
//        if (result instanceof Result.Success) {
//            LoggedInUser data = ((Result.Success<LoggedInUser>) result).getData();
//            RegisterResult.setValue(new RegisterResult(new LoggedInUserView(data.getDisplayName())));
//        } else {
//            RegisterResult.setValue(new RegisterResult(R.string.Register_failed));
//        }
        /* So I currently implemented in asynchronous way*/

    }

    public void registerDataChanged(String userId, String userName, String password) {
        if(!isUserIdValid(userId)) {
            registerFormState.setValue(new RegisterFormState(R.string.invalid_userId, null, null));
        } else if (!isUserNameValid(userName)) {
            registerFormState.setValue(new RegisterFormState(null, R.string.invalid_username, null));
        } else if (!isPasswordValid(password)) {
            registerFormState.setValue(new RegisterFormState(null, null, R.string.invalid_password));
        } else {
            registerFormState.setValue(new RegisterFormState(true));
        }
    }


    // A placeholder userId validation check
    private boolean isUserIdValid(String userId) {
        if (userId == null) {
            return false;
        }
        if (userId.contains("@")) {
            return Patterns.EMAIL_ADDRESS.matcher(userId).matches();
        } else {
            return !userId.trim().isEmpty();
        }
    }

    // A placeholder username validation check
    private boolean isUserNameValid(String userName) {
        return userName != null && userName.trim().length() > 2;
    }

    // A placeholder password validation check
    private boolean isPasswordValid(String password) {
        return password != null && password.trim().length() > 5;
    }
}