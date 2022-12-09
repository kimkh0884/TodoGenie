// Generated by view binder compiler. Do not edit!
package com.example.todogenie.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.todogenie.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class ItemTodoBinding implements ViewBinding {
  @NonNull
  private final CardView rootView;

  @NonNull
  public final Button alarmTodo;

  @NonNull
  public final CheckBox checkboxTodo;

  @NonNull
  public final TextView contentTodo;

  @NonNull
  public final Button deleteTodo;

  @NonNull
  public final Button editTodo;

  @NonNull
  public final TextView endTodo;

  @NonNull
  public final LinearLayout layoutMenusTodo;

  @NonNull
  public final LinearLayout layoutTodo;

  @NonNull
  public final Button menuTodo;

  @NonNull
  public final TextView startTodo;

  @NonNull
  public final TextView titleTodo;

  private ItemTodoBinding(@NonNull CardView rootView, @NonNull Button alarmTodo,
      @NonNull CheckBox checkboxTodo, @NonNull TextView contentTodo, @NonNull Button deleteTodo,
      @NonNull Button editTodo, @NonNull TextView endTodo, @NonNull LinearLayout layoutMenusTodo,
      @NonNull LinearLayout layoutTodo, @NonNull Button menuTodo, @NonNull TextView startTodo,
      @NonNull TextView titleTodo) {
    this.rootView = rootView;
    this.alarmTodo = alarmTodo;
    this.checkboxTodo = checkboxTodo;
    this.contentTodo = contentTodo;
    this.deleteTodo = deleteTodo;
    this.editTodo = editTodo;
    this.endTodo = endTodo;
    this.layoutMenusTodo = layoutMenusTodo;
    this.layoutTodo = layoutTodo;
    this.menuTodo = menuTodo;
    this.startTodo = startTodo;
    this.titleTodo = titleTodo;
  }

  @Override
  @NonNull
  public CardView getRoot() {
    return rootView;
  }

  @NonNull
  public static ItemTodoBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static ItemTodoBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.item_todo, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static ItemTodoBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.alarm_todo;
      Button alarmTodo = ViewBindings.findChildViewById(rootView, id);
      if (alarmTodo == null) {
        break missingId;
      }

      id = R.id.checkbox_todo;
      CheckBox checkboxTodo = ViewBindings.findChildViewById(rootView, id);
      if (checkboxTodo == null) {
        break missingId;
      }

      id = R.id.content_todo;
      TextView contentTodo = ViewBindings.findChildViewById(rootView, id);
      if (contentTodo == null) {
        break missingId;
      }

      id = R.id.delete_todo;
      Button deleteTodo = ViewBindings.findChildViewById(rootView, id);
      if (deleteTodo == null) {
        break missingId;
      }

      id = R.id.edit_todo;
      Button editTodo = ViewBindings.findChildViewById(rootView, id);
      if (editTodo == null) {
        break missingId;
      }

      id = R.id.end_todo;
      TextView endTodo = ViewBindings.findChildViewById(rootView, id);
      if (endTodo == null) {
        break missingId;
      }

      id = R.id.layout_menus_todo;
      LinearLayout layoutMenusTodo = ViewBindings.findChildViewById(rootView, id);
      if (layoutMenusTodo == null) {
        break missingId;
      }

      id = R.id.layout_todo;
      LinearLayout layoutTodo = ViewBindings.findChildViewById(rootView, id);
      if (layoutTodo == null) {
        break missingId;
      }

      id = R.id.menu_todo;
      Button menuTodo = ViewBindings.findChildViewById(rootView, id);
      if (menuTodo == null) {
        break missingId;
      }

      id = R.id.start_todo;
      TextView startTodo = ViewBindings.findChildViewById(rootView, id);
      if (startTodo == null) {
        break missingId;
      }

      id = R.id.title_todo;
      TextView titleTodo = ViewBindings.findChildViewById(rootView, id);
      if (titleTodo == null) {
        break missingId;
      }

      return new ItemTodoBinding((CardView) rootView, alarmTodo, checkboxTodo, contentTodo,
          deleteTodo, editTodo, endTodo, layoutMenusTodo, layoutTodo, menuTodo, startTodo,
          titleTodo);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}