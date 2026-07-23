import os


JWT_SECRET = os.getenv(
    'JWT_SECRET',
    'development-secret'
)

JWT_ALGORITHM = 'HS256'

ACCESS_TOKEN_EXPIRE_MINUTES = 12 * 60