package com.example.todogenie.ui.main.ui.home;

import android.app.DatePickerDialog;
import android.app.Dialog;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.DatePicker;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager.widget.ViewPager;

import com.example.todogenie.R;
import com.example.todogenie.data.model.todo_model;
import com.example.todogenie.data.retrofit_client;
import com.example.todogenie.databinding.FragmentHomeBinding;
import com.google.android.material.tabs.TabLayout;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;

    private TabLayout tabLayout;
    private TodoPageAdapter todoPageAdapter;
    private ViewPager viewPager;
    private int tabCurrentIdx = 0;
    private Button todoAddButton;
    Dialog mDialog;

    Calendar calendar = Calendar.getInstance();

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        final TextView textView = binding.textHome;
        homeViewModel.getText().observe(getViewLifecycleOwner(), textView::setText);

        tabLayout = binding.todoTabLayout;
        viewPager = binding.todoViewPager;

        tabLayout.addTab(tabLayout.newTab().setText("Daily"));
        tabLayout.addTab(tabLayout.newTab().setText("Weekly"));
        tabLayout.addTab(tabLayout.newTab().setText("Monthly"));
//        tabLayout.addTab(tabLayout.newTab().setCustomView(customTabView(R.drawable.)));

        todoPageAdapter = new TodoPageAdapter(getChildFragmentManager(), tabLayout.getTabCount());
        viewPager.setAdapter(todoPageAdapter);
        viewPager.setCurrentItem(tabCurrentIdx);
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                viewPager.setCurrentItem(tab.getPosition());
                tabCurrentIdx = tab.getPosition();
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {

            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {

            }
        });

        mDialog = new Dialog(root.getContext());                                                                             // Item 팝업 Dialog
        mDialog.setContentView(R.layout.dialog_add_todo);
        mDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT));

        todoAddButton = binding.buttonAddTodo;
        todoAddButton.setOnClickListener(view -> {
            mDialog.show();

            Button can_btn = (Button) mDialog.findViewById(R.id.todoAddCancel);
            Button ok_btn = (Button) mDialog.findViewById(R.id.todoAddOK);

            final EditText titleT = (EditText) mDialog.findViewById(R.id.editTextTitle);
            final EditText startDateT = (EditText) mDialog.findViewById(R.id.startDate);
            final EditText endDateT = (EditText) mDialog.findViewById(R.id.endDate);

            titleT.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

                }

                @Override
                public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                    if (charSequence.length() == 0) {
                        titleT.setHintTextColor(ContextCompat.getColor(root.getContext(), R.color.red));
                    }
                }

                @Override
                public void afterTextChanged(Editable editable) {

                }
            });

            startDateT.setOnClickListener(v -> {
                DatePickerDialog dialog = new DatePickerDialog(getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        startDateT.setText(i + "/" + (i1+1) + "/" + i2);
                    }
                }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH));
                dialog.show();
            });

            endDateT.setOnClickListener(v -> {
                DatePickerDialog dialog = new DatePickerDialog(getContext(), new DatePickerDialog.OnDateSetListener() {
                    @Override
                    public void onDateSet(DatePicker datePicker, int i, int i1, int i2) {
                        endDateT.setText(i + "/" + (i1+1) + "/" + i2);
                    }
                }, calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH), calendar.get(Calendar.DAY_OF_MONTH));
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
                        Toast.makeText(getContext(), "필수 항목을 채워주세요", Toast.LENGTH_SHORT).show();
                        e.printStackTrace();
                        error = true;
                    }
                    if (!error && endDate.before(startDate)) {
                        Toast.makeText(getContext(), "날짜를 제대로 입력해주세요", Toast.LENGTH_SHORT).show();
                    } else if (title.length() == 0 || endDate == null) {
                        Toast.makeText(getContext(), "필수 항목을 채워주세요", Toast.LENGTH_SHORT).show();
                    } else {
                        TodoVO newTodo = new TodoVO(title, "", startDate, endDate, false);
                        uploadNewTodo(newTodo);
                        mDialog.dismiss();
                    }
                }
            });
        });

        return root;
    }

    private void uploadNewTodo(TodoVO newTodo) {
        try {
            Call<todo_model> call;
            todo_model bodyObject = new todo_model(newTodo.getTitle(), newTodo.getStart(), newTodo.getEnd(), newTodo.getChecked());
            call = retrofit_client.getApiService(getContext()).upload_todo(bodyObject);
            call.enqueue(new Callback<todo_model>() {
                @Override
                public void onResponse(Call<todo_model> call, Response<todo_model> response) {
//                    binding.loading.setVisibility(View.INVISIBLE);
                    if (response.isSuccessful()) { // response code 200~300
                        Toast.makeText(getActivity(), "Uploaded new todo", Toast.LENGTH_LONG).show();
                        refreshFragment();
                    }
                    else {
                        Log.d("todoUpload", response.message());
                    }
                }

                @Override
                public void onFailure(Call<todo_model> call, Throwable t) {
//                    binding.loading.setVisibility(View.INVISIBLE);
                    Toast.makeText(getActivity(), "Server Error", Toast.LENGTH_SHORT).show();
                }
            });
        } catch (Exception e) {
//            binding.loading.setVisibility(View.INVISIBLE);
            Toast.makeText(getActivity(), "Network Error", Toast.LENGTH_SHORT).show();
        }
    }

    public void refreshFragment(){
        FragmentTransaction ft = getFragmentManager().beginTransaction();
        if (Build.VERSION.SDK_INT >= 26) {
            ft.setReorderingAllowed(false);
        }
        ft.detach(this).attach(this).commit();
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}