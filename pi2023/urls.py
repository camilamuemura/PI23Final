from django.urls import path
from . import views

urlpatterns = [
    #path('', views.index_exemplo, name='index-exemplo'),
    path('', views.index, name='index'),
    path('sobre_o_projeto.html', views.sobre_o_projeto, name='sobre_o_projeto'),
    path('universidade.html', views.universidade, name='universidade'), 
    path('index.html', views.home, name='home')
]
