package com.example.todogenie.data;

import com.example.todogenie.data.model.data_model;
import com.example.todogenie.data.model.login_model;
import com.example.todogenie.data.model.register_model;
import com.example.todogenie.data.model.user_model;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface Retrofit_interface {
    @GET("/todos")
    Call<ArrayList<data_model>> get_todos();

    @POST("/users/login")
    Call<user_model> login(
            @Body login_model body);

    @POST("/users/sign_up")
    Call<user_model> login(
            @Body register_model body);

    @GET("/todos/recommendation")
    Call<data_model> get_rcmm();
}
