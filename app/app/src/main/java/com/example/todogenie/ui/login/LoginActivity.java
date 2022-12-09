package com.example.todogenie.ui.login;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.ui.AppBarConfiguration;

import com.example.todogenie.databinding.ActivityLoginBinding;
import com.example.todogenie.ui.login.login_custom.CustomLoginActivity;
import com.example.todogenie.ui.main.MainActivity;
import com.example.todogenie.ui.register.RegisterActivity;
import com.example.todogenie.ui.tutorial.TutorialActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInStatusCodes;
import com.google.android.gms.common.SignInButton;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.Task;

public class LoginActivity extends AppCompatActivity {

    private static final int RC_SIGN_IN = 1;
    private static final int RC_SIGN_OUT = 2;
    private AppBarConfiguration appBarConfiguration;
    private ActivityLoginBinding binding;
    GoogleSignInClient mGoogleSignInClient;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        GoogleSignInAccount gsa = GoogleSignIn.getLastSignedInAccount(this);
        if (gsa != null) {
            gotoMainActivity(gsa.getEmail(), gsa.getDisplayName());
        }

        binding = ActivityLoginBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        SignInButton signInButton = binding.buttonLoginGoogle;
//        signInButton.setSize(SignInButton.SIZE_WIDE);
        signInButton.setOnClickListener(view -> {
            GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestEmail()
                    .build();
            mGoogleSignInClient = GoogleSignIn.getClient(this, gso);
            Intent signInIntent = mGoogleSignInClient.getSignInIntent();
            startActivityForResult(signInIntent, RC_SIGN_IN);
        });

        binding.skipLogin.setOnClickListener(new View.OnClickListener() {
            // function for testing
            @Override
            public void onClick(View view) {
                gotoTutorialActivity("test_ID", "test_UserName");
            }
        });

        binding.buttonLoginCustom.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                gotoCustomLoginActivity();
            }
        });

        binding.textviewRegister.setOnClickListener(v -> {
            gotoRegisterActivity();
        });

    }

    private void gotoMainActivity(String userId, String userName) {
        Intent intent = new Intent(getApplicationContext(), MainActivity.class);
        intent.putExtra("userId", userId);
        intent.putExtra("userName", userName);
        startActivity(intent);
        finish();
    }

    public void gotoRegisterActivity() {
        Intent intent = new Intent(this, RegisterActivity.class);
        startActivity(intent);
    }

    public void gotoCustomLoginActivity() {
        Intent intent = new Intent(this, CustomLoginActivity.class);
        startActivity(intent);
    }

    private void gotoTutorialActivity(String userId, String userName) {
        Intent intent = new Intent(getApplicationContext(), TutorialActivity.class);
        intent.putExtra("userId", userId);
        intent.putExtra("userName", userName);
        startActivity(intent);
        finish();
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
            handleSignInResult(task);
        }
    }

    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount account = completedTask.getResult(ApiException.class);
            Log.d("googleLogin", "signInResult:success account=" + account.getDisplayName());
            gotoMainActivity(account.getEmail(), account.getDisplayName());
            // Signed in successfully, show authenticated UI.

        } catch (ApiException e) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.w("googleLogin", "signInResult:failed code=" + e.getStatusCode());
            Log.w("googleLogin", "statusString=" + GoogleSignInStatusCodes.getStatusCodeString(e.getStatusCode()));
        }
    }


}