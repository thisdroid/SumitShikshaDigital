from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from backend.students.models import Course, Exam, Student

class Command(BaseCommand):
    help = 'Populate database with sample data for testing'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create sample courses
        courses = [
            {
                'name': 'Python Programming',
                'description': 'Learn Python programming from basics to advanced concepts',
                'rating': 4.5,
                'status': 'ongoing'
            },
            {
                'name': 'Web Development with Django',
                'description': 'Build web applications using Django framework',
                'rating': 4.8,
                'status': 'ongoing'
            },
            {
                'name': 'React.js Fundamentals',
                'description': 'Learn React.js for frontend development',
                'rating': 4.6,
                'status': 'ongoing'
            },
            {
                'name': 'Database Design',
                'description': 'Learn database design and SQL',
                'rating': 4.3,
                'status': 'ongoing'
            }
        ]
        
        created_courses = []
        for course_data in courses:
            course, created = Course.objects.get_or_create(  # type: ignore
                name=course_data['name'],
                defaults=course_data
            )
            created_courses.append(course)
            if created:
                self.stdout.write(f'Created course: {course.name}')
        
        # Create sample exams
        exams = [
            {
                'title': 'Python Basics Quiz',
                'course': created_courses[0],
                'duration': 30,
                'scheduled_date': '2024-01-15'
            },
            {
                'title': 'Django Fundamentals Test',
                'course': created_courses[1],
                'duration': 45,
                'scheduled_date': '2024-01-20'
            },
            {
                'title': 'React Components Quiz',
                'course': created_courses[2],
                'duration': 40,
                'scheduled_date': '2024-01-25'
            }
        ]
        
        for exam_data in exams:
            exam, created = Exam.objects.get_or_create(  # type: ignore
                title=exam_data['title'],
                course=exam_data['course'],
                defaults=exam_data
            )
            if created:
                self.stdout.write(f'Created exam: {exam.title}')
        
        self.stdout.write(
            'Successfully created sample data!'  # type: ignore
        ) 