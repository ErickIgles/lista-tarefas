from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializers
<<<<<<< HEAD
from django.views.generic import TemplateView
=======
from rest_framework.permissions import AllowAny
>>>>>>> develop


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializers
    permission_classes = [AllowAny]


class IndexTemplateView(TemplateView):
    template_name = 'index.html'

