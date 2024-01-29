from django.shortcuts import render

from django.http import HttpResponse
import requests
import json


def send_notification(registration_ids, message_title, message_desc):
    fcm_api = "AAAAzNkDroI:APA91bE4BaEkPRLgsdkzKYlnwihU5RsQ_S039b2dFJYB52cthAFQB2zvd0ezRqZS8nUOZ8ydy6OU7RkiBIPlyquihEDBFtlEN0K59MDx9vHCgB8jiay68upvzxbuuncnObaM2ZOAQEL_"
    url = "https://fcm.googleapis.com/fcm/send"

    headers = {"Content-Type": "application/json", "Authorization": "key=" + fcm_api}

    payload = {
        "registration_ids": registration_ids,
        "priority": "high",
        "notification": {
            "body": message_desc,
            "title": message_title,
            "image": "https://i.ytimg.com/vi/m5WUPHRgdOA/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDwz-yjKEdwxvKjwMANGk5BedCOXQ",
            "icon": "https://yt3.ggpht.com/ytc/AKedOLSMvoy4DeAVkMSAuiuaBdIGKC7a5Ib75bKzKO3jHg=s900-c-k-c0x00ffffff-no-rj",
        },
    }

    try:
        result = requests.post(url, data=json.dumps(payload), headers=headers)
        result.raise_for_status()  # Check for HTTP errors
        print(result.json())
    except requests.exceptions.HTTPError as errh:
        print("HTTP Error:", errh)
    except requests.exceptions.ConnectionError as errc:
        print("Error Connecting:", errc)
    except requests.exceptions.Timeout as errt:
        print("Timeout Error:", errt)
    except requests.exceptions.RequestException as err:
        print("Oops, something went wrong:", err)


def index(request):
    return render(request, "index.html")


def send(request):
    resgistration = [
        "ehuGvfXScpwUuqBdaUt68u:APA91bE6fgWtEuGHzh87DjfdrgE4gwidbZDxRy6Yy3hfRtnXo5YxxHkJuM6Z_xnHr3XpKNUASptZ7TUJm_4yBeWatfcKYKkms4U3JvUaIjAtn05YmfT1GcVZVLczj9gAIyv0VEHV0HJk"
    ]
    send_notification(
        resgistration, "Code Keen added a new video", "Code Keen new video alert"
    )
    return HttpResponse("sent")


def showFirebaseJS(request):
    data = (
        'importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");'
        'importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"); '
        "var firebaseConfig = {"
        '        apiKey: "AIzaSyCotT3kyCaqAV9GSos2WuB1AHHdn76tUTs",'
        '        authDomain: "dakhni-recipes.firebaseapp.com",'
        '        projectId: "dakhni-recipes",'
        '        databaseURL: "https://dakhni-recipes-default-rtdb.firebaseio.com/",'
        '        storageBucket: "dakhni-recipes.appspot.com",'
        '        messagingSenderId: "879814225538",'
        '        appId: "1:879814225538:web:a35e61533e5b29f9958e9b",'
        '        measurementId: "G-WJK9BLPHV2"'
        " };"
        "firebase.initializeApp(firebaseConfig);"
        "const messaging=firebase.messaging();"
        "messaging.setBackgroundMessageHandler(function (payload) {"
        "    console.log(payload);"
        "    const notification=JSON.parse(payload);"
        "    const notificationOption={"
        "        body:notification.body,"
        "        icon:notification.icon"
        "    };"
        "    return registration.showNotification(payload.notification.title,notificationOption);"
        "});"
    )

    return HttpResponse(data, content_type="text/javascript")
