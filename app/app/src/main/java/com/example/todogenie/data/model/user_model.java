package com.example.todogenie.data.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class user_model {
    @SerializedName("_id")
    @Expose
    private String id;

    @SerializedName("userId")
    @Expose
    private String userId;

    @SerializedName("userName")
    @Expose
    private String userName;

    @SerializedName("password")
    @Expose
    private String password;

    @SerializedName("err")
    @Expose
    private String errorStr;

    public String getId() {
        return id;
    }

    public String getPassword() {
        return password;
    }

    public String getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }

    public String getErrorStr() {
        return "" + errorStr;
    }
}
