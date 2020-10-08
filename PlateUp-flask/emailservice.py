import configparser
import smtplib

def send_email_as_plateup(to_recipients, subject, body):
    ''' 
    Sends an email using smtp, specifically with plateup's gmail account.
    '''
    email_cfg = configparser.ConfigParser(interpolation=configparser.ExtendedInterpolation())
    email_cfg.read('email_config.ini') 
    sender_email = email_cfg["SENDER"]['email']     
    sender_password = email_cfg["SENDER"]['pwd']   

    email_text = """\
    From: %s
    To: %s
    Subject: %s

    %s
    """ % (sender_email, ", ".join(to_recipients), subject, body)

    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        server.ehlo()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_recipients, email_text)
        server.close()

        return True
    except:
        return False