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

import com.example.todogenie.databinding.FragmentHomeWeeklyBinding;

import java.util.ArrayList;

public class HomeFragment_Weekly extends Fragment {
    private FragmentHomeWeeklyBinding binding;
    private RecyclerView rcvWeeklyTodo;
    private RVAdapter_Weekly rvAdapter_Weekly;

    public ArrayList<TodoVO> lstTodo = new ArrayList<TodoVO>();
    public Object TodoVO;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        binding = FragmentHomeWeeklyBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        rcvWeeklyTodo = binding.recyclerViewTodoWeekly;
        rcvWeeklyTodo.addItemDecoration(new DividerItemDecoration(root.getContext(), DividerItemDecoration.VERTICAL));

        rvAdapter_Weekly = new RVAdapter_Weekly(getContext(), lstTodo);
        rcvWeeklyTodo.setLayoutManager(new LinearLayoutManager(getActivity()));
        rcvWeeklyTodo.setAdapter(rvAdapter_Weekly);
        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        binding.textDateWeekly.setText(homeViewModel.getWeeklyDateString());
        //homeViewModel.getLstTodoWeekly(lstTodo, rvAdapter_Weekly);

        ImageButton buttonTodoLeft = binding.buttonTodoLeft;
        buttonTodoLeft.setOnClickListener(view -> {
            lstTodo.clear();
            rvAdapter_Weekly.notifyDataSetChanged();
            homeViewModel.subOneWeek();
            homeViewModel.getLstTodoWeekly(lstTodo, rvAdapter_Weekly);
            binding.textDateWeekly.setText(homeViewModel.getWeeklyDateString());
        });

        ImageButton buttonTodoRight = binding.buttonTodoRight;
        buttonTodoRight.setOnClickListener(view -> {
            lstTodo.clear();
            rvAdapter_Weekly.notifyDataSetChanged();
            homeViewModel.addOneWeek();
            homeViewModel.getLstTodoWeekly(lstTodo, rvAdapter_Weekly);
            binding.textDateWeekly.setText(homeViewModel.getWeeklyDateString());
        });

        return root;
    }

}

