package com.example.todogenie.ui.main.ui.home;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.ItemTouchHelper;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.todogenie.R;
import com.example.todogenie.databinding.FragmentHomeBinding;
import com.example.todogenie.databinding.FragmentHomeDailyBinding;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class HomeFragment_Daily extends Fragment {
    private FragmentHomeDailyBinding binding;
    private RecyclerView rcvDailyTodo;
    private RVAdapter_Daily rvAdapter_Daily;

    public List<TodoVO> lstTodo = new ArrayList<TodoVO>();
    public Object TodoVO;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentHomeDailyBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        rcvDailyTodo = binding.recyclerViewTodoDaily;
        rcvDailyTodo.addItemDecoration(new DividerItemDecoration(root.getContext(), DividerItemDecoration.VERTICAL));
        rvAdapter_Daily = new RVAdapter_Daily(getContext(), lstTodo);
        rcvDailyTodo.setLayoutManager(new LinearLayoutManager(getActivity()));
        rcvDailyTodo.setAdapter(rvAdapter_Daily);

        lstTodo.add(new TodoVO()); // test
        lstTodo.add(new TodoVO());
        lstTodo.add(new TodoVO());

        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy. MM. dd.");
        binding.textDateDaily.setText(sdf.format(date).toString());

        return root;
    }
}