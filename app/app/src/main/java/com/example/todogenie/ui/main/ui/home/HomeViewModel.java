package com.example.todogenie.ui.main.ui.home;

import android.content.Context;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.example.todogenie.data.model.todo_model;
import com.example.todogenie.data.retrofit_client;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeViewModel extends ViewModel {

    private final MutableLiveData<String> mText;
    private ArrayList<TodoVO> cacheList;
    private Date currentDate;
    private Calendar calendar;

    public HomeViewModel() {
        mText = new MutableLiveData<>();
        mText.setValue("TodoGenie");
        currentDate = new Date();
        calendar = Calendar.getInstance();
        calendar.setTime(currentDate);
        cacheList = new ArrayList<TodoVO>();
    }

    public LiveData<String> getText() {
        return mText;
    }

    public String getDailyDateString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy. MM. dd.");
        return sdf.format(currentDate).toString();
    }

    public String getWeeklyDateString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Calendar calendar = Calendar.getInstance();
        String[] dates = sdf.format(currentDate).toString().split("-");
        int year = Integer.parseInt(dates[0]);
        int month = Integer.parseInt(dates[1]);
        int day = Integer.parseInt(dates[2]);
        calendar.set(year, month - 1, day);
        return getMonthlyDateString() + " week" + calendar.get(Calendar.WEEK_OF_MONTH);
    }

    public String getMonthlyDateString() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy. MM.");
        return sdf.format(currentDate).toString();
    }

    public void getLstTodo(Context context) {
        Call<ArrayList<todo_model>> call;
        call = retrofit_client.getApiService(context).get_todos();
        call.enqueue(new Callback<ArrayList<todo_model>>() {
            @Override
            public void onResponse(Call<ArrayList<todo_model>> call, Response<ArrayList<todo_model>> response) {
                if (response.isSuccessful()) {

                    // on successful we are hiding our progressbar.
//                    progressBar.setVisibility(View.GONE);

                    // below line is to add our data from api to our array list.
                    ArrayList<todo_model> lstResponse = response.body();

                    // below line we are running a loop to add data to our adapter class.
                    for (int i = 0; i < lstResponse.size(); i++) {
                        todo_model responseData = lstResponse.get(i);
                        cacheList.add(new TodoVO(responseData.getTitle(), "content", responseData.getStart(), responseData.getEnd(), responseData.getState()));
                    }
                } else {
                    Log.d("res", response.toString());
                }
            }

            @Override
            public void onFailure(Call<ArrayList<todo_model>> call, Throwable t) {
                cacheList.add(new TodoVO());
                cacheList.add(new TodoVO());
                cacheList.add(new TodoVO());
            }
        });

    }

    public void getLstTodoDaily(ArrayList<TodoVO> lstTodo, RVAdapter_Daily rvAdapter) {
        if (cacheList.isEmpty()) {
            getLstTodo(rvAdapter.mContext);
        }
        for (TodoVO todo : cacheList) {
            SimpleDateFormat fmt = new SimpleDateFormat("yyyyMMdd");
            Log.d("res", fmt.format(todo.getEnd()));
            if (fmt.format(todo.getEnd()).equals(fmt.format(currentDate))) {
                lstTodo.add(todo);
                rvAdapter.notifyItemInserted(lstTodo.size() - 1);
            }
        }
    }

    public void getLstTodoWeekly(ArrayList<TodoVO> lstTodo, RVAdapter_Weekly rvAdapter) {
        if (cacheList.isEmpty()) {
            getLstTodo(rvAdapter.mContext);
        }
        int i=1;
//        String[] days = {" ", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
        for (TodoVO todo : cacheList) {
            SimpleDateFormat fmt = new SimpleDateFormat("yyyy.w");

            if (fmt.format(todo.getEnd()).equals(fmt.format(currentDate))) {
//                while(calendar.get(Calendar.DAY_OF_WEEK) <= i) {
//                    lstTodo.add(new TodoVO(days[i], "", new Date(), new Date(), false));
//                    rvAdapter.notifyItemInserted(lstTodo.size() - 1);
//                    i++;
//                }
                lstTodo.add(todo);
                rvAdapter.notifyItemInserted(lstTodo.size() - 1);
            }
        }
//        while(i <= 7) {
//            lstTodo.add(new TodoVO(days[i], "", false, new Date()));
//            rvAdapter.notifyItemInserted(lstTodo.size() - 1);
//            i++;
//        }
    }

    public void addOneDay() {
        calendar.add(Calendar.DATE, 1);
        currentDate = calendar.getTime();
    }

    public void subOneDay() {
        calendar.add(Calendar.DATE, -1);
        currentDate = calendar.getTime();
    }

    public void addOneWeek() {
        calendar.add(Calendar.DATE, 7);
        currentDate = calendar.getTime();
    }

    public void subOneWeek() {
        calendar.add(Calendar.DATE, -7);
        currentDate = calendar.getTime();
    }

    public void addOneMonth() {
        calendar.add(Calendar.MONTH, 1);
        currentDate = calendar.getTime();
    }

    public void subOneMonth() {
        calendar.add(Calendar.MONTH, -1);
        currentDate = calendar.getTime();
    }

}