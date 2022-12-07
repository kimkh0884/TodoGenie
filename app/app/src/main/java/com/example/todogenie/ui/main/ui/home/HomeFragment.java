package com.example.todogenie.ui.main.ui.home;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.viewpager.widget.ViewPager;

import com.example.todogenie.R;
import com.example.todogenie.databinding.FragmentHomeBinding;
import com.google.android.material.tabs.TabLayout;

public class HomeFragment extends Fragment {

    private FragmentHomeBinding binding;

    private TabLayout tabLayout;
    private TodoPageAdapter todoPageAdapter;
    private ViewPager viewPager;
    private int tabCurrentIdx = 0;

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

        todoPageAdapter = new TodoPageAdapter(getChildFragmentManager(),tabLayout.getTabCount());
        viewPager.setAdapter(todoPageAdapter);
        viewPager.setCurrentItem(tabCurrentIdx);
        viewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener(){
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

        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }
}