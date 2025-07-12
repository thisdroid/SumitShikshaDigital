from rest_framework import serializers
from django.db import models
from typing import TYPE_CHECKING
from .models import Student, Course, Enrollment, Exam, ExamAttempt, Certificate

if TYPE_CHECKING:
    from django.db.models import Manager

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'contact_number', 'date_joined'
        ]
        read_only_fields = ['id', 'date_joined']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        student = Student(**validated_data)
        if password:
            student.set_password(password)
        student.save()
        return student

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'name', 'description', 'rating', 'status']
        read_only_fields = ['id']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Enrollment
        fields = [
            'id', 'student', 'course', 'status', 'enrolled_on',
            'student_id', 'course_id'
        ]
        read_only_fields = ['id', 'enrolled_on']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        course_id = validated_data.pop('course_id')
        student = Student.objects.get(id=student_id)  # type: ignore
        course = Course.objects.get(id=course_id)  # type: ignore
        return Enrollment.objects.create(  # type: ignore
            student=student,
            course=course,
            **validated_data
        )

class ExamSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Exam
        fields = [
            'id', 'title', 'course', 'duration', 'scheduled_date',
            'course_id'
        ]
        read_only_fields = ['id']

    def create(self, validated_data):
        course_id = validated_data.pop('course_id')
        course = Course.objects.get(id=course_id)  # type: ignore
        return Exam.objects.create(course=course, **validated_data)  # type: ignore

class ExamAttemptSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    exam = ExamSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    exam_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = ExamAttempt
        fields = [
            'id', 'student', 'exam', 'score', 'attempted_on',
            'student_id', 'exam_id'
        ]
        read_only_fields = ['id', 'attempted_on']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        exam_id = validated_data.pop('exam_id')
        student = Student.objects.get(id=student_id)  # type: ignore
        exam = Exam.objects.get(id=exam_id)  # type: ignore
        return ExamAttempt.objects.create(  # type: ignore
            student=student,
            exam=exam,
            **validated_data
        )

class CertificateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    student_id = serializers.IntegerField(write_only=True)
    course_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Certificate
        fields = [
            'id', 'student', 'course', 'issued_on',
            'student_id', 'course_id'
        ]
        read_only_fields = ['id', 'issued_on']

    def create(self, validated_data):
        student_id = validated_data.pop('student_id')
        course_id = validated_data.pop('course_id')
        student = Student.objects.get(id=student_id)  # type: ignore
        course = Course.objects.get(id=course_id)  # type: ignore
        return Certificate.objects.create(  # type: ignore
            student=student,
            course=course,
            **validated_data
        ) 