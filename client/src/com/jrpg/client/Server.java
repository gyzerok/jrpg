package com.jrpg.client;

import android.util.Log;
import io.socket.IOAcknowledge;
import io.socket.IOCallback;
import io.socket.SocketIO;
import io.socket.SocketIOException;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;

public class Server {
    private final String TAG = "JRPG-Game";
    private final String URL = "http://10.0.2.2:8080";

    private static Server mInstance = null;
    private SocketIO mServerSocket = null;

    public static Server instance()
    {
        if (mInstance == null) mInstance = new Server();

        return mInstance;
    }

    public Server()
    {
        try
        {
            mServerSocket = new SocketIO(URL);
        }
        catch (MalformedURLException e)
        {
            Log.e(TAG, e.getMessage());
        }
    }

    public void connect()
    {
        mServerSocket.connect(new ServerIOCallback());
    }

    public class ServerIOCallback implements IOCallback {
        @Override
        public void onMessage(JSONObject json, IOAcknowledge ack)
        {
            try
            {
                Log.i(TAG, "Server said:" + json.toString(2));
            } catch (JSONException e)
            {
                e.printStackTrace();
            }
        }

        @Override
        public void onMessage(String data, IOAcknowledge ack)
        {
            Log.i(TAG, "Server said: " + data);
        }

        @Override
        public void onError(SocketIOException socketIOException)
        {
            Log.i(TAG, "An error occured " + socketIOException.getMessage());
        }

        @Override
        public void onDisconnect()
        {
            Log.i(TAG, "Connection terminated.");
        }

        @Override
        public void onConnect()
        {
            Log.i(TAG, "Connection established");
        }

        @Override
        public void on(String event, IOAcknowledge ack, Object... args)
        {
            Log.i(TAG, "Server triggered event '" + event + "'");
        }
    }
}
