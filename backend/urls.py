from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from backend.students import views

urlpatterns = [
    # ✅ Homepage
    path('', views.home_view, name='home'),

    # ✅ Admin
    path('admin/', admin.site.urls),

    # ✅ JWT Auth
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Student Auth and Profile
    path('api/register/', views.student_register, name='student-register'),
    path('api/login/', views.student_login, name='student-login'),
    path('api/profile/', views.student_profile, name='student-profile'),

    # ✅ Course APIs
    path('api/courses/', views.course_list, name='course-list'),
    path('api/courses/<int:pk>/', views.course_detail, name='course-detail'),

    # ✅ Enrollment APIs
    path('api/enroll/', views.enroll_course, name='enroll-course'),
    path('api/my-enrollments/', views.my_enrollments, name='my-enrollments'),

    # ✅ Exam APIs
    path('api/exams/', views.exam_list, name='exam-list'),
    path('api/exams/<int:pk>/', views.exam_detail, name='exam-detail'),

    # ✅ Exam Attempt APIs
    path('api/submit-attempt/', views.submit_exam_attempt, name='submit-attempt'),
    path('api/my-attempts/', views.my_exam_attempts, name='my-attempts'),

    # ✅ Certificate APIs
    path('api/certificates/', views.my_certificates, name='my-certificates'),
    path('api/issue-certificate/', views.issue_certificate, name='issue-certificate'),
]
