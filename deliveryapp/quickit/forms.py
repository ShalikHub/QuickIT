from django import forms
from django.core import validators
#from quickit.models import User

#def check_for_z(value):
    #if value[0].lower() != 'a-s':
        #raise forms.ValidationError("NAME needs to start with Z")

class formName(forms.Form):
 name = forms.CharField()
 email = forms.EmailField()
 verify_email = forms.EmailField(label='enter your email again')
 text = forms.CharField(widget=forms.Textarea)
 botcatcher = forms.CharField(required=False,widget=forms.HiddenInput,validators=[validators.MaxLengthValidator(0)])

 def clean(self):
     all_clean_data = super().clean()
     email = all_clean_data['email']
     vmail = all_clean_data['verify_email']

     if email != vmail:
         raise forms.ValidationError("Make sure Email match!")

def clean_botcatcher(self):
    botcatcher = self.cleaned_data['botcatcher']
    if len(botcatcher) > 0:
        raise forms.ValidationError("Gotha BOT!")
"""class NewUser(forms.ModelForm):
    class Meta:
        model = User
        fields = '__all__'"""
