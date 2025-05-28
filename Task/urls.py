from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, IndexTemplateView

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('index/', IndexTemplateView.as_view(), name='index_template')
]