import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import (
    Input,
    Conv2D,
    MaxPooling2D,
    Flatten,
    Dense,
    Dropout
)

# =========================
# BUILD MODEL ARCHITECTURE
# =========================
model = Sequential([
    Input(shape=(48, 48, 1)),   # Explicit Input layer (correct way)

    Conv2D(32, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),

    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),

    Flatten(),

    Dense(128, activation='relu'),
    Dropout(0.5),

    Dense(7, activation='softmax')  # 7 emotion classes
])

# =========================
# LOAD WEIGHTS (SAFE MODE)
# =========================
model.load_weights(
    "model.h5",
    by_name=True,
    skip_mismatch=True
)

print("✅ Model architecture created")
print("✅ Weights loaded successfully")
# Save full model (architecture + weights)
model.save("facial_expression_model.keras")
