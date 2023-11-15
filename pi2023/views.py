from django.shortcuts import render
from django.db import models
from .models import Dados
from .models import GraficoEstados
from django.core.serializers import serialize
from django.http import JsonResponse


def index(request):
    return render(request, "index.html")


def sobre_o_projeto(request):
    return render(request, "sobre_o_projeto.html")


def universidade(request):
    return render(request, "universidade.html")


def home(request):
    return render(request, "index.html")


def dashboard(request):
    return render(request, "dashboard.html")


def dados_grafico(request):
    dados = GraficoEstados.objects.values("Estado", "Ocorrencias")
    return JsonResponse(list(dados), safe=False)
