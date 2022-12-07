package com.example.todogenie.ui.main.ui.home;


import android.app.Dialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.todogenie.R;

import java.util.ArrayList;
import java.util.List;

public class RVAdapter_Weekly extends RecyclerView.Adapter<RVAdapter_Weekly.MyViewHolder> implements Filterable {
    Context mContext;
    List<TodoVO> mData;
    List<TodoVO> unFilData;
    Dialog mDialog;

    public RVAdapter_Weekly(Context mContext, List<TodoVO> mData) {
        this.mContext = mContext;
        this.mData = mData;
        this.unFilData = mData;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View v ;
        v = LayoutInflater.from(mContext).inflate(R.layout.item_todo, parent, false);
        final MyViewHolder vHolder = new MyViewHolder(v);
        final Animation animFadeIn = AnimationUtils.loadAnimation(v.getContext(), R.anim.fade_in);
        final Animation animFadeOut = AnimationUtils.loadAnimation(v.getContext(), R.anim.fade_out);
        final Animation animFadeInHalf = AnimationUtils.loadAnimation(v.getContext(), R.anim.fade_in_half);
        final Animation animFadeOutHalf = AnimationUtils.loadAnimation(v.getContext(), R.anim.fade_out_half);

        vHolder.btn_menu.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                vHolder.menus_todo.setVisibility(View.VISIBLE);
                if(vHolder.is_menu_opened == false) {
                    vHolder.is_menu_opened = true;
                    vHolder.btn_menu.startAnimation(animFadeOutHalf);
                    vHolder.menus_todo.startAnimation(animFadeIn);
                }
                else {
                    vHolder.is_menu_opened = false;
                    vHolder.btn_menu.startAnimation(animFadeInHalf);
                    vHolder.menus_todo.startAnimation(animFadeOut);
                }
            }
        });
        return vHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        TodoVO todoVO = mData.get(position);
        holder.tv_title.setText(todoVO.getTitle());
        holder.tv_content.setText(todoVO.getContent());
        holder.checkBox.setChecked(todoVO.getChecked());
        holder.menus_todo.setVisibility(View.INVISIBLE);
    }

    //3) getItemCount
    @Override
    public int getItemCount() {
        if (mData == null){
            return 0;
        }
        return mData.size();
    }

    @Override
    public Filter getFilter() {
        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                String str = constraint.toString();
                if(str.isEmpty()) {
                    mData = unFilData;
                } else {
                    List<TodoVO> filteringList = new ArrayList<>();
                    for(TodoVO item : unFilData) {
                        if(item.getTitle().toLowerCase().contains(str) || item.getTitle().contains(str) || item.getContent().contains(str))
                            filteringList.add(item);
                    }
                    mData = filteringList;
                }

                FilterResults filterResults = new FilterResults();
                filterResults.values = mData;

                return filterResults;
            }

            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                mData = (List<TodoVO>) results.values;
                notifyDataSetChanged();
            }
        };
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        private LinearLayout item_todo;
        private CheckBox checkBox;
        private TextView tv_title;
        private TextView tv_content;
        private boolean is_menu_opened;
        private LinearLayout menus_todo;
        private Button btn_menu;
        private Button btn_alarm;
        private Button btn_edit;
        private Button btn_delete;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            item_todo = itemView.findViewById(R.id.layout_todo);
            checkBox = itemView.findViewById(R.id.checkbox_todo);
            tv_title = itemView.findViewById(R.id.title_todo);
            tv_content = itemView.findViewById(R.id.content_todo);

            is_menu_opened = false;
            menus_todo = itemView.findViewById(R.id.layout_menus_todo);
            btn_menu = itemView.findViewById(R.id.menu_todo);
            btn_alarm = itemView.findViewById(R.id.alarm_todo);
            btn_edit = itemView.findViewById(R.id.edit_todo);
            btn_delete = itemView.findViewById(R.id.delete_todo);
        }
    }
}
