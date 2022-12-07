package com.example.todogenie.ui.main.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.example.todogenie.databinding.FragmentHomeMonthlyBinding;

import java.util.ArrayList;

public class HomeFragment_Monthly extends Fragment {
    private FragmentHomeMonthlyBinding binding;

    public ArrayList<TodoVO> lstTodo;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        lstTodo = new ArrayList<TodoVO>();
        binding = FragmentHomeMonthlyBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        HomeViewModel homeViewModel =
                new ViewModelProvider(this).get(HomeViewModel.class);

        return root;
    }
}