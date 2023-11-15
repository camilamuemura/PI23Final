from django.db import models


class Dados(models.Model):
    id = models.AutoField(primary_key=True)
    DataHora = models.DateTimeField()
    Satelite = models.CharField(max_length=50)
    Pais = models.CharField(max_length=50)
    Estado = models.CharField(max_length=50)
    Municipio = models.CharField(max_length=50)
    Bioma = models.CharField(max_length=50)
    DiaSemChuva = models.FloatField()
    Precipitacao = models.FloatField()
    RiscoFogo = models.FloatField()
    Latitude = models.FloatField()
    Longitude = models.FloatField()
    FRP = models.FloatField()


class GraficoEstados(models.Model):
    id = models.AutoField(primary_key=True)
    Estado = models.CharField(max_length=50)
    Ocorrencias = models.FloatField()

    def __str__(self):
        return self.Estado
