from django.core.management.base import BaseCommand
from store.models import Product

class Command(BaseCommand):
    help = 'Add sample products to the database'

    def handle(self, *args, **options):
        products = [
            {
                'name': 'Smart Watch Series 7',
                'price': 399.00,
                'image': 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400'
            },
            {
                'name': 'Urban Explorer Backpack',
                'price': 89.50,
                'image': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400'
            },
            {
                'name': 'Instax Mini 11 Camera',
                'price': 69.00,
                'image': 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=400'
            },
            {
                'name': 'Nike Metcon X Shoes',
                'price': 120.00,
                'image': 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=400'
            },
            {
                'name': 'Sony XM4 Headphones',
                'price': 299.00,
                'image': 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400'
            },
            {
                'name': 'Leather Satchel Bag',
                'price': 150.00,
                'image': 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=400'
            },
        ]

        for product_data in products:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'price': product_data['price'],
                }
            )
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'✅ Created product: {product.name}')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'⚠️  Product already exists: {product.name}')
                )

        self.stdout.write(self.style.SUCCESS('✅ Sample products added successfully!'))
