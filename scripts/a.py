import tensorflow as tf
model = tf.keras.models.load_model("emotion_model.keras")
model.save_weights("emotion_model.weights.h5")
