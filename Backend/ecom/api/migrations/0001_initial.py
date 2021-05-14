from django.db import migrations
from api.user.models import CustomeUser


class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomeUser(name="parth",
                email="parth@parth.tech",
                is_staff = True,
                is_superuser=True, 
                phone=8000992573, 
                gender="Male" )

        user.set_password("12345")
        user.save()

    dependencies = [
        
    ]

    operations = [
        migrations.RunPython(seed_data),

    ]