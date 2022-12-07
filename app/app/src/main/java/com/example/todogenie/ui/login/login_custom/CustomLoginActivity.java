package com.example.todogenie.ui.login.login_custom;

import android.content.Intent;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.todogenie.data.model.login_model;
import com.example.todogenie.data.model.user_model;
import com.example.todogenie.data.retrofit_client;
import com.example.todogenie.databinding.ActivityLoginCustomBinding;
import com.example.todogenie.ui.main.MainActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CustomLoginActivity extends AppCompatActivity {

    private LoginViewModel loginViewModel;
    private ActivityLoginCustomBinding binding;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityLoginCustomBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        loginViewModel = new ViewModelProvider(this, new LoginViewModelFactory())
                .get(LoginViewModel.class);

        final EditText userIdEditText = binding.loginUserId;
        final EditText passwordEditText = binding.loginPassword;
        final Button loginButton = binding.login;
        final ProgressBar loadingProgressBar = binding.loading;

        loginViewModel.getLoginFormState().observe(this, new Observer<LoginFormState>() {
            @Override
            public void onChanged(@Nullable LoginFormState loginFormState) {
                if (loginFormState == null) {
                    return;
                }
                loginButton.setEnabled(loginFormState.isDataValid());
                if (loginFormState.getUsernameError() != null) {
                    userIdEditText.setError(getString(loginFormState.getUsernameError()));
                }
                if (loginFormState.getPasswordError() != null) {
                    passwordEditText.setError(getString(loginFormState.getPasswordError()));
                }
            }
        });

//        loginViewModel.getLoginResult().observe(this, new Observer<LoginResult>() {
//            @Override
//            public void onChanged(@Nullable LoginResult loginResult) {
//                if (loginResult == null) {
//                    return;
//                }
//                loadingProgressBar.setVisibility(View.GONE);
//                if (loginResult.getError() != null) {
//                    showLoginFailed(loginResult.getError());
//                }
//                if (loginResult.getSuccess() != null) {
//                    updateUiWithUser(loginResult.getSuccess());
//                }
//                setResult(Activity.RESULT_OK);
//
//                finish();
//            }
//        });

        TextWatcher afterTextChangedListener = new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
                // ignore
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                // ignore
            }

            @Override
            public void afterTextChanged(Editable s) {
                loginViewModel.loginDataChanged(userIdEditText.getText().toString(),
                        passwordEditText.getText().toString());
            }
        };
        userIdEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.setOnEditorActionListener(new TextView.OnEditorActionListener() {

            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
//                    loginViewModel.login(userIdEditText.getText().toString(),
//                            passwordEditText.getText().toString());
                    login(userIdEditText.getText().toString(),
                            passwordEditText.getText().toString());
                    InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(binding.password.getWindowToken(), 0);
                }
                return false;
            }
        });

        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadingProgressBar.setVisibility(View.VISIBLE);
//                loginViewModel.login(userIdEditText.getText().toString(),
//                        passwordEditText.getText().toString());
                login(userIdEditText.getText().toString(),
                        passwordEditText.getText().toString());
                InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(binding.password.getWindowToken(), 0);
            }
        });
    }

    private void login(String userId, String password) {
        try {
            Call<user_model> call;

            login_model bodyObject = new login_model(userId, password);
            call = retrofit_client.getApiService().login(bodyObject);
            call.enqueue(new Callback<user_model>() {
                @Override
                public void onResponse(Call<user_model> call, Response<user_model> response) {
                    binding.loading.setVisibility(View.INVISIBLE);
                    if (response.isSuccessful()) { // response code 200~300
                        user_model responseData = response.body();
                        if ("null".equals(responseData.getErrorStr())) { // login success
                            gotoMainActivity(responseData.getUserId(), responseData.getUserName());
                        } else {
                            Toast.makeText(getApplicationContext(), responseData.getErrorStr(), Toast.LENGTH_LONG).show();
                        }
                    }
                }
                @Override
                public void onFailure(Call<user_model> call, Throwable t) {
                    binding.loading.setVisibility(View.INVISIBLE);
                    Toast.makeText(getApplicationContext(), "Server Error", Toast.LENGTH_SHORT);
                }
            });
        } catch (Exception e) {
            binding.loading.setVisibility(View.INVISIBLE);
            Toast.makeText(getApplicationContext(), "Network Error", Toast.LENGTH_SHORT);
        }
    }

    private void gotoMainActivity(String userId, String userName) {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        intent.putExtra("userId", userId);
        intent.putExtra("userName", userName);
        startActivity(intent);
        finish();
    }

//    private void updateUiWithUser(LoggedInUserView model) {
//        String welcome = getString(R.string.welcome) + model.getDisplayName();
//        Toast.makeText(getApplicationContext(), welcome, Toast.LENGTH_LONG).show();
//    }
//
//    private void showLoginFailed(@StringRes Integer errorString) {
//        Toast.makeText(getApplicationContext(), errorString, Toast.LENGTH_SHORT).show();
//    }
}