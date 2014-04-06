package com.jrpg.client;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;

public class MainActivity extends Activity {
    private final String TAG = "JRPG";
    //private final String URL = "http://192.168.82.148:8080";
    private final String URL = "http://10.0.2.2:8080";
    private SocketIO mServerSocket;
    private Integer mGameId;

    private Button mPlayButton;
    private Button mActButton;
    private EditText mNick;
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        mPlayButton = (Button) findViewById(R.id.play_button);
        mActButton = (Button) findViewById(R.id.act_button);
        mActButton.setVisibility(0);
        mNick = (EditText) findViewById(R.id.nick);

        mPlayButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                IOAcknowledge ack = new IOAcknowledge() {
                    @Override
                    public void ack(Object... objects) {
                        Log.i(TAG, "Acknowledge");
                    }
                };
                mServerSocket.emit("find", ack, mNick.getText());
                mActButton.setVisibility(View.VISIBLE);
            }
        });

        mActButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mPlayButton.setVisibility(View.GONE);
                mNick.setVisibility(View.GONE);
            }
        });
    }

    @Override
    public void onResume() {
        super.onResume();

        connectWebSocket();
    }

    private void connectWebSocket() {
        try {
            mServerSocket = new SocketIO(URL);
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
                if (event.equals("new game") || event.equals("next step"))
                {
                    drawState((JSONObject)args[0]);
                }
                else if (event.equals("end game"))
                {
                    finish();
                }
            }
        });
    }

    public void drawState(JSONObject json) {
        try {
            mGameId = json.getInt("id");
            JSONArray players = json.getJSONArray("players");
            for (int i = 0; i < players.length(); i++) {
                JSONObject player = players.optJSONObject(i);
                String nick = player.getString("nick");
                if (nick.equals(mNick.getText())) {

                }
                else {

                }
            }
        }
        catch (JSONException e)
        {
            Log.e(TAG, e.getMessage());
        }
    }

    public void endStep() {
        IOAcknowledge ack = new IOAcknowledge() {
            @Override
            public void ack(Object... objects) {
                Log.i(TAG, "Acknowledge");
            }
        };

        // TODO: Сюда надо будет хахуячить JSONObject
        mServerSocket.emit("act", ack, null);
    }
}
