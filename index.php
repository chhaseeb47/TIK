<?php  
session_start(); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {  
    $video_url = htmlspecialchars($_POST['video_url']);  
      
    if (!empty($video_url)) {  
        if (isset($_SESSION['last_order_time'])) {
            $time_since_last_order = time() - $_SESSION['last_order_time'];
            if ($time_since_last_order < 180) {
                $message = "❌ Please wait 3 minute!";
            } else {
                $allow_order = true;
            }
        } else {
            $allow_order = true;
        }

        if (isset($allow_order)) {
            $api_url = "https://pakprovider.site/api/v1";  
            $api_key = "b94TLzIET6vmWit80NJarmXvV4rOA9o4";  
      
            $post_data = [  
                'key' => $api_key,  
                'action' => 'add',  
                'service' => 32005,  
                'link' => $video_url,  
                'quantity' => 500  
            ];  
      
            $ch = curl_init();  
            curl_setopt($ch, CURLOPT_URL, $api_url);  
            curl_setopt($ch, CURLOPT_POST, true);  
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data);  
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);  
            $response = curl_exec($ch);  
            curl_close($ch);  
      
            $result = json_decode($response, true);  
      
            if (isset($result['order'])) {  
                $_SESSION['last_order_time'] = time();  
                $message = "✅ Likes Order Placed Successfully! Order ID: " . $result['order'];  
            } else {  
                $message = "❌ Failed to send views. Error: " . ($result['error'] ?? "Unknown error");  
            }  
        }
    } else {  
        $message = "❌ Please enter a valid TikTok video URL.";  
    }  
}  
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free TikTok Views</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background: #121212;
            color: white;
            height: 100%;
            overflow: auto;
        }

        .container {
            background: #1e1e1e;
            padding: 40px 30px;
            border-radius: 15px;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
            max-width: 450px;
            width: 100%;
            margin: 5% auto;
            animation: fadeIn 1s ease-in-out;
        }

        h2 {
            color: #00bcd4;
            margin-bottom: 30px;
            font-size: 28px;
            animation: slideIn 1s ease-out;
        }

        input, .btn {
            width: 100%;
            padding: 16px;
            margin: 12px 0;
            border-radius: 8px;
            border: none;
            background: #333;
            color: white;
            font-size: 16px;
            transition: background 0.3s ease;
        }

        .btn {
            background: linear-gradient(45deg, #00bcd4, #ff00ff);
            cursor: pointer;
        }

        .btn:hover {
            background: linear-gradient(45deg, #ff00ff, #00bcd4);
        }

        .message {
            background: #111;
            padding: 20px;
            margin-top: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px #00bcd4;
            text-align: center;
            font-size: 18px;
            animation: fadeInMessage 1s ease-out;
        }

        .whatsapp-button {
            display: inline-block;
            background: #25D366;
            color: white;
            padding: 16px 30px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 18px;
            margin-top: 30px;
            font-weight: bold;
            transition: transform 0.3s ease;
        }

        .whatsapp-button:hover {
            transform: scale(1.05);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInMessage {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @media (max-width: 600px) {
            .container {
                width: 90%;
                margin: 10% auto;
            }
            h2 {
                font-size: 22px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>🚀 Get Free TikTok Likes</h2>
        <form method="POST">
            <input type="text" name="video_url" placeholder="Enter TikTok Video URL" required>
            <button type="submit" class="btn">🔥 Send Likes</button>
        </form>

        <?php if (!empty($message)) { echo '<div class="message">' . $message . '</div>'; } ?>

        <!-- Updated WhatsApp Link -->
        <a class="whatsapp-button" id="AhmadMods" target="_blank">Join Our WhatsApp Channel</a>
    </div>

    <script>
        const AhmadMods = atob("aHR0cHM6Ly93aGF0c2FwcC5jb20vY2hhbm5lbC8wMDI5VmFqWnBxTDdUOGJSdlVxQVUyM0E=");
        document.getElementById("AhmadMods").href = AhmadMods;
    </script>
</body>
</html>
