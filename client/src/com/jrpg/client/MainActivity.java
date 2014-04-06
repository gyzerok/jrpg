package com.jrpg.client;

import android.app.Activity;
import android.os.Bundle;

import android.util.Log;
import android.view.View;
import android.widget.TextView;
import org.java_websocket.client.WebSocketClient;
import org.java_websocket.handshake.ServerHandshake;

import java.net.URI;
import java.net.URISyntaxException;

public class MainActivity extends Activity {
    private final String TAG = "JRPG";
    private WebSocketClient mWebSocketClient;
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
    }

    @Override
    public void onResume() {
        super.onResume();

        Log.i(TAG, "Connecting to server...");
        connectWebSocket();
    }

    private void connectWebSocket() {
        URI uri;
        try {
            uri = new URI("ws://127.0.0.1:8080");
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return;
        }

        mWebSocketClient = new WebSocketClient(uri) {
            @Override
            public void onOpen(ServerHandshake serverHandshake) {
                Log.i(TAG, "Opened");
                mWebSocketClient.send("Hello from client");
            }

            @Override
            public void onMessage(String s) {
                final String message = s;
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        TextView textView = (TextView)findViewById(R.id.text);
                        textView.setText(textView.getText() + "\n" + message);
                    }
                });
            }

            @Override
            public void onClose(int i, String s, boolean b) {
                Log.i(TAG, "Closed " + s);
            }

            @Override
            public void onError(Exception e) {
                Log.i(TAG, "Error " + e.getMessage());
            }
        };
        mWebSocketClient.connect();
    }

    public void sendMessage(View view) {
        //EditText editText = (EditText)findViewById(R.id.message);
        mWebSocketClient.send("");
        //editText.setText("");
    }
}
