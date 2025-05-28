from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializers
from rest_framework.permissions import IsAuthenticated
from django.views.generic import TemplateView


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializers
    permission_classes = [IsAuthenticated]


class IndexTemplateView(TemplateView):
    template_name = 'index.html'

