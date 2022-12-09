package com.example.todogenie.data;

import android.content.Context;

import com.franmontiel.persistentcookiejar.PersistentCookieJar;
import com.franmontiel.persistentcookiejar.cache.SetCookieCache;
import com.franmontiel.persistentcookiejar.persistence.SharedPrefsCookiePersistor;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.CookieJar;
import okhttp3.OkHttpClient;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class retrofit_client {
    private static final String BASE_URL = "http://192.168.137.1:80";

    public static Retrofit_interface getApiService(Context context) {
        return getInstance(context).create(Retrofit_interface.class);
    }

    private static Retrofit getInstance(Context context) {
        Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-MM-dd'T'hh:mm:ss.SSS'Z'")
                .setLenient()
                .create();

//        CookieManager cookieManager = new CookieManager();
//        cookieManager.setCookiePolicy(CookiePolicy.ACCEPT_ALL);
//        JavaNetCookieJar cookieJar = new JavaNetCookieJar(cookieManager);
//        OkHttpClient okHttpClient = new OkHttpClient.Builder().cookieJar(cookieJar).build();

        CookieJar cookieJar = new PersistentCookieJar(new SetCookieCache(),
                new SharedPrefsCookiePersistor(context));
        OkHttpClient client = new OkHttpClient.Builder().cookieJar(cookieJar).build();

        return new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create(gson))
                .build();
    }

}
