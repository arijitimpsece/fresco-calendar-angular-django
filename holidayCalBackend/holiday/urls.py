from django.contrib import admin
from django.urls import path, include
from holiday import views

from django.views.decorators.csrf import csrf_exempt
#Add your views to the url patterns

urlpatterns = [
    path('holidays/all/',views.HolidayListView.as_view(),  name='List-all'),
    path('deleteholidayinfo/<int:pk>/',views.HolidayListView.as_view(),  name='Holiday-Delete'),
    path('updateholidayinfo/<int:pk>/',views.HolidayListView.as_view(),  name='Holiday-Edit'),
    path('create/', views.HolidayCreateView.as_view(), name='Create'),
    path('cities/', views.CityListView.as_view(), name='List-all-cities'),
    path('create/cities/', views.CityListView.as_view(), name='List-all-cities'),
    path('monthly/', views.MonthlyHolidayView.as_view(), name='Month'),
    path('daily/', views.DailyHolidayView.as_view(), name='Daily'),
    path('admin/login/', (views.AdminLoginView.as_view()), name='Admin-Login'),
    path('upload/', (views.HolidayEditView.as_view()), name='Upload'),
    path('admin/create', views.AdminCreateView.as_view(), name='Admin Create'),
    path('cities/create', views.CityCreateView.as_view(), name='City Create'),
    path('cities/delete/<int:pk>/', views.CityView.as_view(), name='City Dele'),
]

