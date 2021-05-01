role = Role.create(role_type: 'admin')
admin = User.create(email: 'admin@gmail.com', password: '123456', role: role)
