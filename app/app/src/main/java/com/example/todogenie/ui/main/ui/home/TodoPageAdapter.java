package com.example.todogenie.ui.main.ui.home;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

public class TodoPageAdapter extends FragmentStatePagerAdapter {
    private int numberOfFragment;
    public TodoPageAdapter(FragmentManager fm, int numberOfFragment){
        super(fm, FragmentStatePagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        this.numberOfFragment = numberOfFragment;
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){
            case 0: return new HomeFragment_Daily();
            case 1: return new HomeFragment_Weekly();
            default: return new HomeFragment_Monthly();
        }
    }

    @Override
    public int getCount() {
        return numberOfFragment;
    }
}