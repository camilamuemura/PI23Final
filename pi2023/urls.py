from django.urls import path
from . import views
from .views import dashboard
from .views import dados_grafico
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('', views.index_exemplo, name='index-exemplo'),
    path("", views.index, name="index"),
    path("sobre_o_projeto.html", views.sobre_o_projeto, name="sobre_o_projeto"),
    path("universidade.html", views.universidade, name="universidade"),
    path("index.html", views.home, name="home"),
    path("dashboard.html", dashboard, name="dashboard"),
    path("dados_grafico/", dados_grafico, name="dados_grafico"),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
