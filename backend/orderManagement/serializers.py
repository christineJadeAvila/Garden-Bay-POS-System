from django.contrib.auth.models import User
from rest_framework import serializers
from .models import C_Order, Product, Product_Category, Order_Line, Payment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user    

class C_OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = C_Order
        fields = ["order_ID", "orderDate", "totalAmount"]
        extra_kwargs = {"totalAmount": {"read_only": True}}

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = [
            "product_ID", 
            "category_ID", 
            "product_name", 
            "price", 
            "prepTime"
        ]


class Product_CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Category
        fields = ["category_ID", "category_name", "decription"]

class PaymentSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Payment
        fields = [
            "payment_ID", 
            "order_ID", 
            "payment_method", 
            "payment_status", 
            "total_amount_paid"
        ]
