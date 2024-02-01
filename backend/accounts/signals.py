from portal.services import trigger_mails


def send_verification_email(sender, instance, created, **kwargs):
    if created:
        subject = "Welcome to Dakhni Recipe!"
        body = f"""Dear {instance.name},\n\nCongratulations! You've successfully signed up for Dakhni Recipe, your go-to mobile app for delightful culinary experiences.\n\nGet ready to embark on a flavorful journey with our app, where you'll discover a rich collection of authentic Dakhni recipes to spice up your kitchen. From aromatic biryanis to mouthwatering curries, we've got it all!\n\nHappy cooking!\n\nBest regards,\n\nThe Dakhni Recipe Team"""

        recievers = [instance.email]
        to_cc = ["momin.meenaz29@gmail.com"]
        trigger_mails(subject, body, recievers, to_cc)
