from django.db import models

# Create your models here.
class Ebook(models.Modal):
  title = models.CharField(max_length = 140)
  author = models.CharField(max_length = 60)
  description = models.TextField()
  publication_date = models.DateField()

  def __str__(self):
    return self.title

class Review(models.Model):
  created_at = models.DateTimeField(auto_now_add = True)
  update_at = models.DateTimeField(auto_now=True)
  review_author = models.CharField(max)