from django.core.exceptions import ValidationError
import requests
import json

from accounts.models import User
from social.models import Notification


def send_notification(sender, instance, created, **kwargs):
    if created:
        all_users = User.objects.filter(fcm_token__isnull=False)
        fcm_tokens = all_users.values_list("fcm_token", flat=True)
        if fcm_tokens and len(fcm_tokens) > 0:
            print(list(fcm_tokens))
            server_key = "AAAAzNkDroI:APA91bE4BaEkPRLgsdkzKYlnwihU5RsQ_S039b2dFJYB52cthAFQB2zvd0ezRqZS8nUOZ8ydy6OU7RkiBIPlyquihEDBFtlEN0K59MDx9vHCgB8jiay68upvzxbuuncnObaM2ZOAQEL_"
            url = "https://fcm.googleapis.com/fcm/send"

            headers = {
                "Content-Type": "application/json",
                "Authorization": "key=" + server_key,
            }
            title = "New Recipe Alert!"
            body = "We've just added a delicious new recipe to our collection. Perfect for cooking enthusiasts and anyone who loves trying new flavors. Don't miss out!"
            icon = ""
            image = ""
            payload = {
                "registration_ids": list(fcm_tokens),
                "priority": "high",
                "notification": {
                    "body": body,
                    "title": title,
                    "image": image,
                    "icon": icon,
                },
            }
            try:
                result = requests.post(url, data=json.dumps(payload), headers=headers)
                result.raise_for_status()  # Check for HTTP errors
                print(result.json())
            except requests.exceptions.HTTPError as errh:
                raise ValidationError("HTTP Error:", errh)
            except requests.exceptions.ConnectionError as errc:
                raise ValidationError("Error Connecting:", errc)
            except requests.exceptions.Timeout as errt:
                raise ValidationError("Timeout Error:", errt)
            except requests.exceptions.RequestException as err:
                raise ValidationError("Oops, something went wrong:", err)
            create_notifications = []
            for user in all_users:
                create_notifications.append(
                    Notification(recipe=instance, user=user, is_read=False)
                )
            # print(create_notifications)
            Notification.objects.bulk_create(create_notifications)
            # print("createdddddddddddd")
