package com.jrpg.client;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import io.socket.IOAcknowledge;

public class MainActivity extends Activity {
    private final String TAG = "JRPG-Game";

    private Server mServer;

    private Button mPlayButton;
    /**
     * Called when the activity is first created.
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);

        mServer = Server.instance();
        mPlayButton = (Button) findViewById(R.id.play_button);

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
    }
}
