

from flask import Flask, render_template, request
from flask_mail import Mail, Message
from forms import ContactForm


app = Flask(__name__)
app.secret_key = '116lwpbwys=dh)*y3i-m(-pgov$+(vo^hi_k_j0(e66=blh9*_'

# add mail server config
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'YourUser@NameHere'
app.config['MAIL_PASSWORD'] = 'yourMailPassword'

mail = Mail(app)

@app.route('/contact', methods=('GET', 'POST'))
def contact():
form = ContactForm()

if request.method == 'POST':
    if form.validate() == False:
        return 'Please fill in all fields <p><a href="quick/contact">Try Again!!! </a></p>'
    else:
        msg = Message("Message from your visitor" + form.name.data,
                      sender='YourUser@NameHere',
                      recipients=['yourRecieve@mail.com', 'someOther@mail.com'])
        msg.body = """
        From: %s <%s>,
        %s
        """ % (form.name.data, form.email.data, form.message.data)
        mail.send(msg)
        return "Successfully  sent message!"
elif request.method == 'GET':
    return render_template('contact.html', form=form)

if __name__ == '__main__':
app.run()
