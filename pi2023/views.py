from django.shortcuts import render

def index(request):
    return render(request, 'index.html') 

def sobre_o_projeto(request):
    return render(request, 'sobre_o_projeto.html') 

def universidade(request):
    return render(request, 'universidade.html') 

def home(request):
    return render(request, 'index.html') 

