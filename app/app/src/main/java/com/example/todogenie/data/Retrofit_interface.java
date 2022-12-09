package com.example.todogenie.data;

import com.example.todogenie.data.model.login_model;
import com.example.todogenie.data.model.rcmd_model;
import com.example.todogenie.data.model.register_model;
import com.example.todogenie.data.model.todo_model;
import com.example.todogenie.data.model.user_model;

import java.util.ArrayList;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Query;

public interface Retrofit_interface {
    @GET("/todos")
    Call<ArrayList<todo_model>> get_todos();

    @POST("/todos")
    Call<todo_model> upload_todo(
            @Body todo_model body);

    @PUT("/todos")
    Call<todo_model> update_todo(
            @Body todo_model body, @Query("todoId") String todoId);

    @DELETE("/todos")
    Call<todo_model> delete_todo(
            @Query("todoId") String todoId);

    @GET("/todos/recommendation")
    Call<ArrayList<rcmd_model>> get_rcmd();

    @POST("/users/login")
    Call<user_model> login(
            @Body login_model body);

    @POST("/users/sign_up")
    Call<user_model> login(
            @Body register_model body);
}
