package com.example.todogenie.ui.main.ui.home;

import java.text.SimpleDateFormat;
import java.util.Date;

public class TodoVO {
    private String _id;
    private String title;
    private String content;
    private Date start;
    private Date end;
    private boolean checked;

    TodoVO(){
        this.title = "todoTitle";
        this.content = "todoContent";
        this.checked = true;
        this.start = new Date();
        this.end = new Date();
    }

    TodoVO(String title, String content, Date start, Date end, boolean checked) {
        this.title = title;
        this.content = content;
        this.start = start;
        this.end = end;
        this.checked = checked;
    }

    TodoVO(String _id, String title, String content, Date start, Date end, boolean checked) {
        this._id = _id;
        this.title = title;
        this.content = content;
        this.start = start;
        this.end = end;
        this.checked = checked;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
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

    public Date getStart() {
        return start;
    }

    public void setStart(Date start) {
        this.start = start;
    }

    public Date getEnd() {
        return end;
    }

    public void setEnd(Date end) {
        this.end = end;
    }

    public boolean getChecked() {
        return this.checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public String getStartStr(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        return sdf.format(getStart());
    }

    public String getEndStr(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        return sdf.format(getEnd());
    }

    @Override
    public String toString() {
        return "TodoVO{" +
                "_id='" + get_id() + '\'' +
                ", title='" + getTitle() + '\'' +
                ", content='" + getContent() + '\'' +
                '}';
    }

}