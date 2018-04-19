from django.conf.urls import url
from home.views import HomeView
from . import views

urlpatterns = [
    url('', HomeView.as_view(), name='home'),
    url('^connect/(?P<operation>.+)/(?P<pk>\d+)/$', views.change_friends, name='change_friends')
]
