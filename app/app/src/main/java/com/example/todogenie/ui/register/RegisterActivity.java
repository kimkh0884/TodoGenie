package com.example.todogenie.ui.register;

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

import com.example.todogenie.data.model.register_model;
import com.example.todogenie.data.model.user_model;
import com.example.todogenie.data.retrofit_client;
import com.example.todogenie.databinding.ActivityRegisterBinding;
import com.example.todogenie.ui.tutorial.TutorialActivity;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {
    ActivityRegisterBinding binding;
    RegisterViewModel registerViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityRegisterBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        registerViewModel = new ViewModelProvider(this, new RegisterViewModelFactory())
                .get(RegisterViewModel.class);

        final EditText userIdEditText = binding.registerUserId;
        final EditText userNameEditText = binding.registerUserName;
        final EditText passwordEditText = binding.registerPassword;
        final Button registerButton = binding.register;
        final ProgressBar loadingProgressBar = binding.registerLoading;

        registerViewModel.getRegisterFormState().observe(this, new Observer<RegisterFormState>() {
            @Override
            public void onChanged(@Nullable RegisterFormState registerFormState) {
                if (registerFormState == null) {
                    return;
                }
                registerButton.setEnabled(registerFormState.isDataValid());
                if (registerFormState.getUserIdError() != null) {
                    userIdEditText.setError(getString(registerFormState.getUserIdError()));
                }
                if (registerFormState.getUsernameError() != null) {
                    userNameEditText.setError(getString(registerFormState.getUsernameError()));
                }
                if (registerFormState.getPasswordError() != null) {
                    passwordEditText.setError(getString(registerFormState.getPasswordError()));
                }
            }
        });

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
                registerViewModel.registerDataChanged(userIdEditText.getText().toString(), userNameEditText.getText().toString(),
                        passwordEditText.getText().toString());
            }
        };
        userIdEditText.addTextChangedListener(afterTextChangedListener);
        userNameEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.addTextChangedListener(afterTextChangedListener);
        passwordEditText.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
                if (actionId == EditorInfo.IME_ACTION_DONE) {
                    register(userIdEditText.getText().toString(), userNameEditText.getText().toString(),
                            passwordEditText.getText().toString());
                    InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(binding.registerPassword.getWindowToken(), 0);
                }
                return false;
            }
        });
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadingProgressBar.setVisibility(View.VISIBLE);
                register(userIdEditText.getText().toString(), userNameEditText.getText().toString(),
                        passwordEditText.getText().toString());
                InputMethodManager imm = (InputMethodManager) getSystemService(INPUT_METHOD_SERVICE);
                imm.hideSoftInputFromWindow(binding.registerPassword.getWindowToken(), 0);
            }
        });
    }

    private void register(String userId, String userName, String password) {
        try {
            Call<user_model> call;

            register_model bodyObject = new register_model(userId, userName, password);
            call = retrofit_client.getApiService(this).login(bodyObject);
            call.enqueue(new Callback<user_model>() {
                @Override
                public void onResponse(Call<user_model> call, Response<user_model> response) {
                    binding.registerLoading.setVisibility(View.INVISIBLE);
                    if (response.isSuccessful()) { // response code 200~300
                        user_model responseData = response.body();
                        if ("null".equals(responseData.getErrorStr())) { // register success
                            gotoTutorialActivity(responseData.getUserId(), responseData.getUserName());
                            Toast.makeText(getApplicationContext(), "Welcome!", Toast.LENGTH_LONG).show();
                        } else {
                            Toast.makeText(getApplicationContext(), responseData.getErrorStr(), Toast.LENGTH_LONG).show();
                        }
                    }
                }

                @Override
                public void onFailure(Call<user_model> call, Throwable t) {
                    binding.registerLoading.setVisibility(View.INVISIBLE);
                    Toast.makeText(getApplicationContext(), "Server Error", Toast.LENGTH_SHORT);
                }
            });
        } catch (Exception e) {
            binding.registerLoading.setVisibility(View.INVISIBLE);
            Toast.makeText(getApplicationContext(), "Network Error", Toast.LENGTH_SHORT);
        }
    }


    private void gotoTutorialActivity(String userId, String userName) {
        Intent intent = new Intent(getApplicationContext(), TutorialActivity.class);
        intent.putExtra("userId", userId);
        intent.putExtra("userName", userName);
        startActivity(intent);
        finish();
    }

}