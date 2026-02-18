from django.urls import path
from .views import (
    TicketListCreateView,
    TicketUpdateView,
    TicketStatsView,
    TicketClassifyView
)

urlpatterns = [
    path('', TicketListCreateView.as_view()),
    path('<int:pk>/', TicketUpdateView.as_view()),
    path('stats/', TicketStatsView.as_view()),
    path('classify/', TicketClassifyView.as_view()),
]
