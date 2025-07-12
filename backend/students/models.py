from django.db import models
from django.contrib.auth.models import AbstractUser

class Student(AbstractUser):
    contact_number = models.CharField(max_length=20, unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    # email, password, username, first_name, last_name inherited from AbstractUser

    def __str__(self):
        return self.username

class Course(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    rating = models.FloatField(default=0.0)
    status = models.CharField(max_length=20, default='ongoing')

    def __str__(self):
        return self.name

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='ongoing')
    enrolled_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.course.name}"

class Exam(models.Model):
    title = models.CharField(max_length=255)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    duration = models.IntegerField(help_text='Duration in minutes')
    scheduled_date = models.DateField()

    def __str__(self):
        return self.title

class ExamAttempt(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    score = models.FloatField(default=0.0)
    attempted_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.exam.title}"

class Certificate(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    issued_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.username} - {self.course.name}"
