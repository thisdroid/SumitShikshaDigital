from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.db import transaction
from .models import Student, Course, Enrollment, Exam, ExamAttempt, Certificate
from .serializers import (
    StudentSerializer, CourseSerializer, EnrollmentSerializer,
    ExamSerializer, ExamAttemptSerializer, CertificateSerializer
)

# Student Views
@api_view(['POST'])
@permission_classes([AllowAny])
def student_register(request):
    """Register a new student"""
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        try:
            validated_data = serializer.validated_data  # type: ignore
            student = Student.objects.create_user(
                username=validated_data['username'],  # type: ignore
                email=validated_data['email'],  # type: ignore
                password=validated_data.get('password', ''),  # type: ignore
                contact_number=validated_data['contact_number'],  # type: ignore
                first_name=validated_data.get('first_name', ''),  # type: ignore
                last_name=validated_data.get('last_name', '')  # type: ignore
            )
            return Response(StudentSerializer(student).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def student_login(request):
    """Student login"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=username, password=password)
    if user and hasattr(user, 'contact_number'):  # Check if it's a Student
        login(request, user)
        return Response(StudentSerializer(user).data, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def student_profile(request):
    """Get or update student profile"""
    if request.method == 'GET':
        serializer = StudentSerializer(request.user)
        return Response(serializer.data)
    
    serializer = StudentSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Course Views
@api_view(['GET'])
@permission_classes([AllowAny])
def course_list(request):
    """Get all courses"""
    courses = Course.objects.all()  # type: ignore
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def course_detail(request, pk):
    """Get specific course"""
    try:
        course = Course.objects.get(pk=pk)  # type: ignore
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    except Course.DoesNotExist:  # type: ignore
        return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

# Enrollment Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def enroll_course(request):
    """Enroll in a course"""
    serializer = EnrollmentSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():  # type: ignore
                # Check if already enrolled
                existing_enrollment = Enrollment.objects.filter(  # type: ignore
                    student=request.user,
                    course_id=serializer.validated_data['course_id']  # type: ignore
                ).first()
                
                if existing_enrollment:
                    return Response({'error': 'Already enrolled in this course'}, 
                                 status=status.HTTP_400_BAD_REQUEST)
                
                enrollment = serializer.save(student=request.user)
            return Response(EnrollmentSerializer(enrollment).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_enrollments(request):
    """Get student's enrollments"""
    enrollments = Enrollment.objects.filter(student=request.user)  # type: ignore
    serializer = EnrollmentSerializer(enrollments, many=True)
    return Response(serializer.data)

# Exam Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exam_list(request):
    """Get all exams"""
    exams = Exam.objects.all()  # type: ignore
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def exam_detail(request, pk):
    """Get specific exam"""
    try:
        exam = Exam.objects.get(pk=pk)  # type: ignore
        serializer = ExamSerializer(exam)
        return Response(serializer.data)
    except Exam.DoesNotExist:  # type: ignore
        return Response({'error': 'Exam not found'}, status=status.HTTP_404_NOT_FOUND)

# Exam Attempt Views
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_exam_attempt(request):
    """Submit exam attempt"""
    serializer = ExamAttemptSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():  # type: ignore
                # Check if already attempted
                existing_attempt = ExamAttempt.objects.filter(  # type: ignore
                    student=request.user,
                    exam_id=serializer.validated_data['exam_id']  # type: ignore
                ).first()
                
                if existing_attempt:
                    return Response({'error': 'Already attempted this exam'}, 
                                 status=status.HTTP_400_BAD_REQUEST)
                
                attempt = serializer.save(student=request.user)
            return Response(ExamAttemptSerializer(attempt).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_exam_attempts(request):
    """Get student's exam attempts"""
    attempts = ExamAttempt.objects.filter(student=request.user)  # type: ignore
    serializer = ExamAttemptSerializer(attempts, many=True)
    return Response(serializer.data)

# Certificate Views
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_certificates(request):
    """Get student's certificates"""
    certificates = Certificate.objects.filter(student=request.user)  # type: ignore
    serializer = CertificateSerializer(certificates, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def issue_certificate(request):
    """Issue certificate (admin function)"""
    serializer = CertificateSerializer(data=request.data)
    if serializer.is_valid():
        try:
            with transaction.atomic():  # type: ignore
                # Check if certificate already exists
                existing_certificate = Certificate.objects.filter(  # type: ignore
                    student_id=serializer.validated_data['student_id'],  # type: ignore
                    course_id=serializer.validated_data['course_id']  # type: ignore
                ).first()
                
                if existing_certificate:
                    return Response({'error': 'Certificate already issued'}, 
                                 status=status.HTTP_400_BAD_REQUEST)
                
                certificate = serializer.save()
            return Response(CertificateSerializer(certificate).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
