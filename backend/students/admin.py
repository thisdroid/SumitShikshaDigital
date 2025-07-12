from django.contrib import admin
from .models import Student, Course, Enrollment, Exam, ExamAttempt, Certificate

admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Enrollment)
admin.site.register(Exam)
admin.site.register(ExamAttempt)
admin.site.register(Certificate)
