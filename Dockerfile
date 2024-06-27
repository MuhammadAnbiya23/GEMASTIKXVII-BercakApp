FROM python:3.10-slim

# Set environment variables
ENV PYTHONBUFFERED True
ENV APP_HOME /app

# Set working directory
WORKDIR $APP_HOME

# Copy application code
COPY . .

# Install necessary dependencies including libgl1-mesa-glx for OpenCV
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    gcc \
    libmariadb-dev-compat \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Python dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["python", "app.py"]
