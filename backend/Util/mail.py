import smtplib
from email.mime.text import MIMEText
from email.utils import formataddr

sender = "gugugu_10@163.com"
password = "GGVLJLICKIWKMXIB"


def send_mail(content, receiver):
    ret = True
    try:
        msg = MIMEText(content, 'plain', 'utf-8')
        msg['From'] = formataddr(['FromRunoob', sender])
        msg['To'] = formataddr(["FK", receiver])
        msg['Subject'] = "会议系统账号注册"

        server = smtplib.SMTP_SSL("smtp.163.com", 465)
        server.login(sender, password)
        server.sendmail(sender, receiver, msg.as_string())
        server.quit()
    except Exception:
        ret = False
    return ret
