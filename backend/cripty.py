from crytography.fernet import Fernet 

key = Fernet.generate_key()

print(key)