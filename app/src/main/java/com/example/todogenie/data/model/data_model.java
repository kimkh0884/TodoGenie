package com.example.todogenie.data.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class data_model {
    @SerializedName("_id")
    @Expose
    private String id;

    @SerializedName("title")
    @Expose
    private String title;

    @SerializedName("owner")
    @Expose
    private String owner;

    @SerializedName("end")
    @Expose
    private Date end;

    @SerializedName("state")
    @Expose
    private String state;

    @SerializedName("createTime")
    @Expose
    private Date createTime;

    @SerializedName("updateTime")
    @Expose
    private Date updateTime;

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Date getEnd() {
        return end;
    }

    public String getOwner() {
        return owner;
    }

    public Boolean getState() {
        return state.equals("1");
    }

    public Date getCreateTime() {
        return createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }
}
