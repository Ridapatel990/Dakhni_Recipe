import threading
from django.core.mail import EmailMessage
from django.conf import settings

class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send(fail_silently=True)


def trigger_mails(subject, body, recievers, to_cc):
    email = EmailMessage(
        subject,  # subject
        body,  # body
        settings.EMAIL_HOST_USER,  # from mail
        list(set(recievers)),  # recievers
        cc=list(set(to_cc)),  # in cc
    )
    EmailThread(email).start()
