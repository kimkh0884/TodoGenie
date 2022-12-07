package com.example.todogenie.ui.main.ui.home;

import java.util.Date;

public class TodoVO {
    private String title;
    private String content;
    private boolean checked;
    private Date alarm;

    TodoVO(){
        this.title = "todoTitle";
        this.content = "todoContent";
        this.checked = true;
        this.alarm = null;
    }

    TodoVO(String title, String content, boolean checked, Date alarm) {
        this.title = title;
        this.content = content;
        this.checked = checked;
        this.alarm = alarm;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = this.content;
    }

    public boolean getChecked() {
        return this.checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public Date getAlarm() {
        return this.alarm;
    }

    public void setAlarm(Date alarm) {
        this.alarm = alarm;
    }


    @Override
    public String toString() {
        return "TodoVO{" +
                "title='" + getTitle() + '\'' +
                ", content='" + getContent() + '\'' +
                '}';
    }

}