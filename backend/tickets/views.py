from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from django.utils.timezone import now
from datetime import timedelta
from .models import Ticket
from .serializers import TicketSerializer
import openai
from django.conf import settings


# LIST + CREATE
class TicketListCreateView(generics.ListCreateAPIView):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer
    filterset_fields = ['category', 'priority', 'status']
    search_fields = ['title', 'description']


# UPDATE
class TicketUpdateView(generics.UpdateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer


# STATS
class TicketStatsView(APIView):
    def get(self, request):
        total = Ticket.objects.count()
        open_count = Ticket.objects.filter(status='open').count()

        seven_days_ago = now() - timedelta(days=7)
        avg_per_day = (
            Ticket.objects.filter(created_at__gte=seven_days_ago)
            .count() / 7
        )

        priority_data = (
            Ticket.objects.values('priority')
            .annotate(count=Count('id'))
        )

        category_data = (
            Ticket.objects.values('category')
            .annotate(count=Count('id'))
        )

        return Response({
            "total_tickets": total,
            "open_tickets": open_count,
            "avg_tickets_per_day": round(avg_per_day, 2),
            "priority_breakdown": {i['priority']: i['count'] for i in priority_data},
            "category_breakdown": {i['category']: i['count'] for i in category_data}
        })


# LLM CLASSIFY
class TicketClassifyView(APIView):
    def post(self, request):
        description = request.data.get("description")

        if not description:
            return Response({"error": "Description required"}, status=400)

        try:
            openai.api_key = settings.OPENAI_API_KEY

            prompt = f"""
            Classify this support ticket into:
            Category: billing, technical, account, general
            Priority: low, medium, high, critical

            Ticket: {description}

            Return JSON like:
            {{
              "category": "...",
              "priority": "..."
            }}
            """

            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}]
            )

            import json
            result = json.loads(response['choices'][0]['message']['content'])

            return Response({
                "suggested_category": result.get("category"),
                "suggested_priority": result.get("priority")
            })

        except Exception:
            # Graceful fallback
            return Response({
                "suggested_category": "general",
                "suggested_priority": "low"
            })
