package com.example.todogenie.ui.main.ui.home;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.example.todogenie.R;
import com.example.todogenie.data.model.todo_model;
import com.example.todogenie.data.retrofit_client;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MyViewHolder extends RecyclerView.ViewHolder {
    public LinearLayout item_todo;
    public CheckBox checkBox;
    public TextView tv_title;
    public TextView tv_content;
    public TextView tv_start;
    public TextView tv_end;
    public boolean is_menu_opened;
    public LinearLayout menus_todo;
    public Button btn_menu;
    public Button btn_alarm;
    public Button btn_edit;
    public Button btn_delete;
    public Dialog mDialog;
    public Calendar calendarStart = Calendar.getInstance();
    public Calendar calendarEnd = Calendar.getInstance();

    public MyViewHolder(@NonNull View itemView) {
        super(itemView);
        item_todo = itemView.findViewById(R.id.layout_todo);
        checkBox = itemView.findViewById(R.id.checkbox_todo);
        tv_title = itemView.findViewById(R.id.title_todo);
        tv_content = itemView.findViewById(R.id.content_todo);
        tv_start = itemView.findViewById(R.id.start_todo);
        tv_end = itemView.findViewById(R.id.end_todo);

        is_menu_opened = false;
        menus_todo = itemView.findViewById(R.id.layout_menus_todo);
        btn_menu = itemView.findViewById(R.id.menu_todo);
        btn_alarm = itemView.findViewById(R.id.alarm_todo);
        btn_edit = itemView.findViewById(R.id.edit_todo);
        btn_delete = itemView.findViewById(R.id.delete_todo);

        mDialog = new Dialog(itemView.getContext());                                                                             // Item 팝업 Dialog
        mDialog.setContentView(R.layout.dialog_edit_todo);
        mDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        btn_edit.setOnClickListener(view -> {
            mDialog.show();

            Button can_btn = (Button) mDialog.findViewById(R.id.todoEditCancel);
            Button ok_btn = (Button) mDialog.findViewById(R.id.todoEditOK);

            final EditText titleT = (EditText) mDialog.findViewById(R.id.editTextTitle);
            final EditText startDateT = (EditText) mDialog.findViewById(R.id.startDate);
            final EditText endDateT = (EditText) mDialog.findViewById(R.id.endDate);

            titleT.setText(tv_title.getText());

            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                calendarStart.setTime(sdf.parse(tv_start.getText().toString()));
                calendarEnd.setTime(sdf.parse(tv_end.getText().toString()));
            } catch (ParseException e) {
                e.printStackTrace();
            }
            startDateT.setText(tv_start.getText());
            endDateT.setText(tv_end.getText());

            titleT.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

                }

                @Override
                public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                    if (charSequence.length() == 0) {
                        titleT.setHintTextColor(ContextCompat.getColor(itemView.getContext(), R.color.red));
                    }
                }

                @Override
                public void afterTextChanged(Editable editable) {

                }
            });

            startDateT.setOnClickListener(v -> {
                DatePickerDialog dialog = new DatePickerDialog(itemView.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        startDateT.setText(i + "/" + (i1+1) + "/" + i2);
                    }
                }, calendarStart.get(Calendar.YEAR), calendarStart.get(Calendar.MONTH), calendarStart.get(Calendar.DAY_OF_MONTH));
                dialog.show();
            });

            endDateT.setOnClickListener(v -> {
                DatePickerDialog dialog = new DatePickerDialog(itemView.getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        endDateT.setText(i + "/" + (i1+1) + "/" + i2);
                    }
                }, calendarEnd.get(Calendar.YEAR), calendarEnd.get(Calendar.MONTH), calendarEnd.get(Calendar.DAY_OF_MONTH));
                dialog.show();
            });

            can_btn.setOnClickListener(new Button.OnClickListener() {
                @Override
                public void onClick(View v) {
                    mDialog.dismiss();
                }
            });

            ok_btn.setOnClickListener(new Button.OnClickListener() {
                @Override
                public void onClick(View v) {
                    String title = titleT.getText().toString();
                    Date startDate = null;
                    Date endDate = null;
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
                    String startDateStr = startDateT.getText().toString();
                    String endDateStr = endDateT.getText().toString();
                    Boolean error = false;
                    try {
                        startDate = sdf.parse(startDateStr);
                        endDate = sdf.parse(endDateStr);
                    } catch (ParseException e) {
                        Toast.makeText(itemView.getContext(), "필수 항목을 채워주세요", Toast.LENGTH_SHORT).show();
                        e.printStackTrace();
                        error = true;
                    }
                    if (!error && endDate.before(startDate)) {
                        Toast.makeText(itemView.getContext(), "날짜를 제대로 입력해주세요", Toast.LENGTH_SHORT).show();
                    } else if (title.length() == 0 || endDate == null) {
                        Toast.makeText(itemView.getContext(), "필수 항목을 채워주세요", Toast.LENGTH_SHORT).show();
                    } else {
                        TodoVO newTodo = new TodoVO(title, "", startDate, endDate, false);
                        updateTodo(newTodo);
                        mDialog.dismiss();
                    }
                }
            });
        });
    }

    private void updateTodo(TodoVO newTodo) {
        try {
            Call<todo_model> call;
            todo_model bodyObject = new todo_model(newTodo.get_id(), newTodo.getTitle(), newTodo.getStart(), newTodo.getEnd(), newTodo.getChecked());
            call = retrofit_client.getApiService(itemView.getContext()).upload_todo(bodyObject);
            call.enqueue(new Callback<todo_model>() {
                @Override
                public void onResponse(Call<todo_model> call, Response<todo_model> response) {
//                    binding.loading.setVisibility(View.INVISIBLE);
                    if (response.isSuccessful()) { // response code 200~300
                        Toast.makeText(itemView.getContext(), "Edited todo", Toast.LENGTH_LONG).show();
                    }
                    else {
                        Log.d("todoUpdate", response.message());
                    }
                }
                @Override
                public void onFailure(Call<todo_model> call, Throwable t) {
//                    binding.loading.setVisibility(View.INVISIBLE);
                    Toast.makeText(itemView.getContext(), "Server Error", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
//            binding.loading.setVisibility(View.INVISIBLE);
            Toast.makeText(itemView.getContext(), "Network Error", Toast.LENGTH_SHORT).show();
        }
    }
}
