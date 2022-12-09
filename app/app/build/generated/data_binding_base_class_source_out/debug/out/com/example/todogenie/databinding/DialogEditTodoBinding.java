// Generated by view binder compiler. Do not edit!
package com.example.todogenie.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RelativeLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.example.todogenie.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class DialogEditTodoBinding implements ViewBinding {
  @NonNull
  private final RelativeLayout rootView;

  @NonNull
  public final EditText editTextTitle;

  @NonNull
  public final EditText endDate;

  @NonNull
  public final EditText startDate;

  @NonNull
  public final TextView textView;

  @NonNull
  public final Button todoEditCancel;

  @NonNull
  public final Button todoEditOK;

  private DialogEditTodoBinding(@NonNull RelativeLayout rootView, @NonNull EditText editTextTitle,
      @NonNull EditText endDate, @NonNull EditText startDate, @NonNull TextView textView,
      @NonNull Button todoEditCancel, @NonNull Button todoEditOK) {
    this.rootView = rootView;
    this.editTextTitle = editTextTitle;
    this.endDate = endDate;
    this.startDate = startDate;
    this.textView = textView;
    this.todoEditCancel = todoEditCancel;
    this.todoEditOK = todoEditOK;
  }

  @Override
  @NonNull
  public RelativeLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static DialogEditTodoBinding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static DialogEditTodoBinding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.dialog_edit_todo, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static DialogEditTodoBinding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.editTextTitle;
      EditText editTextTitle = ViewBindings.findChildViewById(rootView, id);
      if (editTextTitle == null) {
        break missingId;
      }

      id = R.id.endDate;
      EditText endDate = ViewBindings.findChildViewById(rootView, id);
      if (endDate == null) {
        break missingId;
      }

      id = R.id.startDate;
      EditText startDate = ViewBindings.findChildViewById(rootView, id);
      if (startDate == null) {
        break missingId;
      }

      id = R.id.textView;
      TextView textView = ViewBindings.findChildViewById(rootView, id);
      if (textView == null) {
        break missingId;
      }

      id = R.id.todoEditCancel;
      Button todoEditCancel = ViewBindings.findChildViewById(rootView, id);
      if (todoEditCancel == null) {
        break missingId;
      }

      id = R.id.todoEditOK;
      Button todoEditOK = ViewBindings.findChildViewById(rootView, id);
      if (todoEditOK == null) {
        break missingId;
      }

      return new DialogEditTodoBinding((RelativeLayout) rootView, editTextTitle, endDate, startDate,
          textView, todoEditCancel, todoEditOK);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}
