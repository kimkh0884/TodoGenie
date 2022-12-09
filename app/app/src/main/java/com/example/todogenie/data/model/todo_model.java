package com.example.todogenie.data.model;

import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class todo_model {
    @SerializedName("_id")
    @Expose
    private String _id;

    @SerializedName("title")
    @Expose
    private String title;

    @SerializedName("start")
    @Expose
    private Date start;

    @SerializedName("end")
    @Expose
    private Date end;

    @SerializedName("state")
    @Expose
    private int state;

    public todo_model(String title, Date start, Date end, Boolean state){
        this.title = title;
        this.start = start;
        this.end = end;
        this.state = state == false ? 0 : 1;
    }

    public todo_model(String _id, String title, Date start, Date end, Boolean state){
        this._id = _id;
        this.title = title;
        this.start = start;
        this.end = end;
        this.state = state == false ? 0 : 1;
    }

    public String getId() {
        return _id;
    }

    public String getTitle() {
        return title;
    }

    public Date getStart() {
        return start;
    }

    public Date getEnd() {
        return end;
    }

    public Boolean getState() {
        return state == 1;
    }
}
