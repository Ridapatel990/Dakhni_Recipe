from portal.services import trigger_mails


def send_verification_email(sender, instance, created, **kwargs):
    if created:
        subject = "Your One-Time Password for Dakhni Recipe App"
        body = f"""Dear {instance.name},\n\nThank you for using Dakhni Recipe app."""

        recievers = [instance.email]
        to_cc = ["momin.meenaz29@gmail.com"]
        trigger_mails(subject, body, recievers, to_cc)
