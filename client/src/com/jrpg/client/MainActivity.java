package com.jrpg.client;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class MainActivity extends Activity {
    private final String TAG = "JRPG";
    private SocketIO mServerSocket;
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

        connectWebSocket();
    }

    private void connectWebSocket() {
        try {
            mServerSocket = new SocketIO("http://192.168.69.109:8080/");
        }
        catch (MalformedURLException e) {
            Log.e(TAG, e.getMessage());
        }

        mServerSocket.connect(new IOCallback() {
            @Override
            public void onMessage(JSONObject json, IOAcknowledge ack) {
                try {
                    Log.i(TAG, "Server said:" + json.toString(2));
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onMessage(String data, IOAcknowledge ack) {
                Log.i(TAG, "Server said: " + data);
            }

            @Override
            public void onError(SocketIOException socketIOException) {
                Log.i(TAG, "an Error occured " + socketIOException.getMessage());
                //socketIOException.printStackTrace();
            }

            @Override
            public void onDisconnect() {
                Log.i(TAG, "Connection terminated.");
            }

            @Override
            public void onConnect() {
                Log.i(TAG, "Connection established");
            }

            @Override
            public void on(String event, IOAcknowledge ack, Object... args) {
                Log.i(TAG, "Server triggered event '" + event + "'");
            }
        });

        IOAcknowledge ack = new IOAcknowledge() {
            @Override
            public void ack(Object... objects) {
                Log.i(TAG, "Acknowledge");
            }
        };
        mServerSocket.emit("test", ack, "text");
    }

}
