package com.example.todogenie.data.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class rcmd_model {
    @SerializedName("_id")
    @Expose
    private String title;

    @SerializedName("count")
    @Expose
    private int count;

    public rcmd_model(String title, int count) {
        this.title = title;
        this.count = count;
    }
}
