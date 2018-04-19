
from django.http import HttpResponse
from django.shortcuts import render
from . import forms
#from quickit.forms import NewUserForm

#from quickit.models import User




def index(request):
    return render(request,'quick/index.html' )

def contact(request):
    return render(request,'quick/contact.html' )

def login(request):
    return render(request,'quick/login.html' )

def users(request):
    return render(request,'quick/users.html' )
def register(request):
    register = false

    

    return render(request,'login/registration.html')
# Create your views here.

def form_name_view(request):
    form = forms.formName()
    if request.method == 'POST':
     form = forms.formName(request.POST)


     if form.is_valid():
         #do something CODE
         print("VALIDATION SUCESS!")
         print("NAME: "+form.cleaned_data['name'])
         print("EMAIL: "+form.cleaned_data['email'])
         print("TEXT: "+form.cleaned_data['text'])

    return render(request,'quick/form_page.html',{'form':form})


    """def users(request):
         form = NewUserForm()

         if request.method == "POST"
         if the form.is_valid():
             form.save(commit=True)
             return index(request)
         else:
             print('error form invalid')

             return render(request, 'quick/users.html',{'form':form})"""
