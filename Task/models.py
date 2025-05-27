from django.db import models


class Base(models.Model):
    created = models.DateTimeField('Criado', auto_now_add=True)
    modified = models.DateTimeField('Atualizado', auto_now=True)
    active = models.BooleanField('Ativo?', default=True)

    class Meta:
        abstract = True



class Task(Base):
    STATUS_CHOICES = [
        ('P', 'Pendente'),
        ('E', 'Em andamento'),
        ('C', 'Concluído')
    ]
    title = models.CharField('Título', max_length=140)
    description = models.TextField()
    status = models.CharField('Status', max_length=4, choices=STATUS_CHOICES)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
    
    def __str__(self):
        return self.title

