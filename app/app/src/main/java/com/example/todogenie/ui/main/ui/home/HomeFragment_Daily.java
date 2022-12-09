package com.example.todogenie.ui.main.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.todogenie.databinding.FragmentHomeDailyBinding;

import java.util.ArrayList;

public class HomeFragment_Daily extends Fragment {
    private FragmentHomeDailyBinding binding;
    private RecyclerView rcvDailyTodo;
    private RVAdapter_Daily rvAdapter_Daily;
    public ArrayList<TodoVO> lstTodo;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        lstTodo = new ArrayList<TodoVO>();
        binding = FragmentHomeDailyBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        rcvDailyTodo = binding.recyclerViewTodoDaily;
        rcvDailyTodo.addItemDecoration(new DividerItemDecoration(root.getContext(), DividerItemDecoration.VERTICAL));

        rvAdapter_Daily = new RVAdapter_Daily(getContext(), lstTodo);
        rcvDailyTodo.setLayoutManager(new LinearLayoutManager(getActivity()));
        rcvDailyTodo.setAdapter(rvAdapter_Daily);

        binding.textDateDaily.setText(homeViewModel.getDailyDateString());
        homeViewModel.getLstTodoDaily(lstTodo, rvAdapter_Daily);

        ImageButton buttonTodoLeft = binding.buttonTodoLeft;
        buttonTodoLeft.setOnClickListener(view -> {
            lstTodo.clear();
            rvAdapter_Daily.notifyDataSetChanged();
            homeViewModel.subOneDay();
            homeViewModel.getLstTodoDaily(lstTodo, rvAdapter_Daily);
            binding.textDateDaily.setText(homeViewModel.getDailyDateString());
        });

        ImageButton buttonTodoRight = binding.buttonTodoRight;
        buttonTodoRight.setOnClickListener(view -> {
            lstTodo.clear();
            rvAdapter_Daily.notifyDataSetChanged();
            homeViewModel.addOneDay();
            homeViewModel.getLstTodoDaily(lstTodo, rvAdapter_Daily);
            binding.textDateDaily.setText(homeViewModel.getDailyDateString());
        });
        return root;
    }

}